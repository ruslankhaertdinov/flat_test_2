#coding=utf-8

class EventsController < ApplicationController
  before_filter :authenticate_user!


  def index
    if params[:date] and params[:date][:output_opt] == '0'
      @target_date = get_target_date(params)
    end

    @selected_output = (params[:date] && params[:date][:output_opt]) || 1
    @events = get_events(params)
    @events = Kaminari.paginate_array(@events).page(params[:page]).per(7)
  end


  def new
    @event = Event.new
  end

  def create
    @event = Event.new(params[:event])
    @event.user_id = current_user.id

    if @event.save
      split_date(@event)
      flash[:notice] = 'Событие успешно сохранено'
      redirect_to root_url
    else
      render :new
    end

  end

  def edit
    @event = Event.where(id: params[:id], user_id: current_user.id).first

    unless @event
      flash[:notice] = 'Вы можете редактировать только свои события'
      redirect_to :events
    end
  end

  def update
    @event = Event.where(id: params[:id], user_id: current_user.id).first
    render_404 and return unless @event
    split_date(@event)

    if @event.update_attributes(params[:event])
      flash[:notice] = 'Событие успешно изменено'
      redirect_to :events
    else
      render action: :edit
    end
  end


  def destroy
    Event.where(id: params[:id], user_id: current_user.id).delete_all
    flash[:notice] = 'Событие удалено'
    redirect_to :events
  end

  private
  def split_date(event)
    date = event[:date].to_date

    case event.repeat
      when Event::REPEAT_WEEKLY
        event.weekday = date.cwday
      when Event::REPEAT_MONTHLY
        event.cal_day = date.day
      when Event::REPEAT_YEARLY
        event.cal_day = date.day
        event.month = date.month
    end

    event.save
  end

  def get_target_date(params)
    if params[:date] and params[:date][:filter].present?
      params[:date][:filter].to_date
    else
      Date.today
    end
  end

  def get_events(params)
    events = Event.where(user_id: current_user.id)
    return events unless params[:date] && params[:date][:output_opt]

    case params[:date][:output_opt]
      when Event::DISPLAY_FIXED_DATE
        events = Event.where('date = ? AND user_id = ?', @target_date, current_user.id)
        events.concat(Event.where('date < ? AND repeat = 1 AND user_id = ?', @target_date, current_user.id)) #ежедневный повтор
        events.concat(Event.where('date < ? AND weekday = ? AND repeat = 2 AND user_id = ?', @target_date, @target_date.cwday, current_user.id)) #еженедельный повтор
        events.concat(Event.where('date < ? AND cal_day = ? AND repeat = 3 AND user_id = ?', @target_date, @target_date.day, current_user.id)) #ежемесячный повтор
        events.concat(Event.where('date < ? AND cal_day = ? AND month = ? AND repeat = 4 AND user_id = ?', @target_date, @target_date.day, @target_date.month, current_user.id)) #ежегодный повтор
      when Event::DISPLAY_ALL
        events = Event.all
    end

    return events
  end
end


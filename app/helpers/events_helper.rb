module EventsHelper
  def correct_date(event)
    today = Date.today

    case event.repeat
      when Event::SINGLE_EVENT
        event.date
      when Event::REPEAT_EVERYDAY
        today
      when Event::REPEAT_WEEKLY
        if event.date.cwday < today.cwday
          today.next_week.at_beginning_of_week + event.date.cwday - 1
        else
          today.at_beginning_of_week + event.date.cwday - 1
        end
      when Event::REPEAT_MONTHLY
        month = event.date.day < today.day ? today.month + 1 : today.month
        "#{event.date.day}.#{month}.#{today.year}".to_date
      when Event::REPEAT_YEARLY
        if (today.month < event.date.month) || (today.month == event.date.month) && (today.day <= event.date.day)
          "#{event.date.day}.#{event.date.month}.#{today.year}".to_date
        else
          "#{event.date.day}.#{event.date.month}.#{today.year + 1}".to_date
        end

    end
  end

  def event_owner(event)
    user = User.find(event.user_id)
    user.name.present? ? user.name : user.email
  end
end

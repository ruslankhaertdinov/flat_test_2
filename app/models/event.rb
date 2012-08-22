#coding=utf-8
class Event < ActiveRecord::Base
  default_scope :order => 'date ASC'
  belongs_to :user


  validates_presence_of :user_id, :title, :date, message: 'поле является обязательным'
  validates_uniqueness_of :title, :scope => :user_id, message: 'дублирование события'
  validates_length_of :title, in: 3..64, too_long: 'не более 64 символов', too_short: 'не менее 3 символов'
  validates_inclusion_of :repeat, :in => 0..4, message: 'выберите значение из списка'
  validates_format_of :date, :with => /\A\d{4}(\-\d{2}){2}\z/, :message => "в формате: '2012-12-31'"

  attr_accessible :title, :date, :repeat, :cal_day, :month, :weekday

  DISPLAY_ALL = '2'
  DISPLAY_FIXED_DATE = '0'

  SINGLE_EVENT = 0
  REPEAT_EVERYDAY = 1
  REPEAT_WEEKLY = 2
  REPEAT_MONTHLY = 3
  REPEAT_YEARLY = 4

  #Доп поля для событий: число (ежемесячный повтор, ежегодный повтор), день недели (еженедельный повтор), месяц (если повтор ежегодный),
  #выборка на сегодня делается так:
  #дата = сегодня,
  #и
  #дата < сегодня
  #  и
  #  повтор = ежедневно
  #  и день недели = сегодня, повтор еженедельный
  #  и число = сегодня,  повтор ежемесячный
  #  и число = сегодня,  месяц = текущий, повтор ежегодный

  #-----------------------------
  #отображение даты в календаре:
  #если она одиночная, отображается поле date
  #если она повторяющаяся, то выводится ближайшая дата в будущем. Т.е.
  #День рождения 18.08.1986 он отобразит как 18.08.2013, так как в этом году оно уже в прошлом,
  #но день рождения 20.10.1987 он отобразит как 20.10.2012, так как событие в будущем для этого года.
end

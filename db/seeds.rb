#coding=utf-8

User.create! do |u|
  u.email = 'ruslanimos@gmail.com'
  u.password = 'ruslanimos@gmail.com'
  u.password_confirmation = 'ruslanimos@gmail.com'
  u.name = 'Руслан'
end

User.create! do |u|
  u.email = 'ruslanimos_2@gmail.com'
  u.password = 'ruslanimos_2@gmail.com'
  u.password_confirmation = 'ruslanimos_2@gmail.com'
end



Event.create! do |ev|
  ev.title = 'Новый год'
  ev.date = '31.12.2012'
  ev.repeat = '4'
  ev.cal_day = '31'
  ev.month = '12'
  ev.user_id = '1'
end

Event.create! do |ev|
  ev.title = 'День рождения'
  ev.date = '18.08.1986'
  ev.repeat = 4
  ev.cal_day = 18
  ev.month = 8
  ev.user_id = 1
end

Event.create! do |ev|
  ev.title = 'Суббота'
  ev.date = '18.08.2012'
  ev.repeat = 2
  ev.user_id = 2
  ev.weekday = 6
end

Event.create! do |ev|
  ev.title = 'Тренировки'
  ev.date = '11.01.2010'
  ev.repeat = 1
  ev.user_id = 2
end

Event.create! do |ev|
  ev.title = 'Оплатить за интернет'
  ev.date = '15.01.2011'
  ev.repeat = '3'
  ev.cal_day = '15'
  ev.user_id = '1'
end

Event.create! do |ev|
  ev.title = 'День знаний'
  ev.date = '01.09.2011'
  ev.repeat = '4'
  ev.cal_day = '1'
  ev.month = '9'
  ev.user_id = '1'
end

Event.create! do |ev|
  ev.title = 'Международный женский день'
  ev.date = '08.03.2012'
  ev.repeat = '4'
  ev.cal_day = '8'
  ev.month = '3'
  ev.user_id = '2'
end

Event.create! do |ev|
  ev.title = 'Распродажа в супермаркете'
  ev.date = '10.10.2012'
  ev.repeat = '0'
  ev.user_id = '2'
end
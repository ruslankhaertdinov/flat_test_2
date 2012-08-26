#coding=utf-8
require 'test_helper'

class EventTest < ActiveSupport::TestCase

  test "validates_presence_of :user_id, :title, :date, message" do
    event = Event.new(title: 'some title', date: '2012-12-31')
    assert !event.save #dont save without user_id

    event.title = nil
    event.user_id = '1'
    assert !event.save #dont save without title

    event.title = 'some title'
    event.date = nil
    assert !event.save #dont save without date

    event.date = '2012-12-31'
    assert event.save #save if all fields present
  end

  test 'validates_uniqueness_of :title, scope: :user_id' do
    event = Event.new(title: 'Новый год', date: '31.12.2012')
    event.user_id = '1'
    event.save

    event = Event.new(title: 'Новый год', date: '31.12.2012')
    event.user_id = '1'
    assert !event.save

    event.user_id = '2'
    assert event.save
  end

  test 'validates_length_of :title, in: 3..64' do
    event = Event.new(date: '2012-12-31')
    event.user_id = '1'

    ['t' * 65, 't'].each do |t|
      event.title = t
      assert !event.save
    end

    ['t' * 3, 't' * 64].each do |t|
      event.title = t
      assert event.save
    end
  end

  test 'validates_inclusion_of :repeat in: 0..4' do
    event = Event.new(title: 'some title', date: '2012-12-31')
    event.user_id = '1'

    [0, 1, 2, 3, 4].each do |r|
      event.repeat = r
      assert event.save
    end

    [-1, 5].each do |r|
      event.repeat = r
      assert !event.save
    end
  end
end

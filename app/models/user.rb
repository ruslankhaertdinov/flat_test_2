#coding=utf-8
class User < ActiveRecord::Base
  has_many :events

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_length_of :name, :in => 3..64, :allow_blank => true, :too_long => 'не более 64 символов', :too_short => 'не менее 3 символов'
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name
end

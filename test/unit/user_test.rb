require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'validates_length_of :name, in: 3..64' do
    user = User.new(email: 'valid@email.com', password: 'valid_password', password_confirmation: 'valid_password')
    assert user.save

    ['n' * 2, 'n' * 65].each do |n|
      user.name = n
      assert !user.save
    end

    ['n' * 3, 'n' *64].each do |n|
      user.name = n
      assert user.save
    end
  end
end

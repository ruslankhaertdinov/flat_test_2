require 'test_helper'

class EventsControllerTest < ActionController::TestCase
  include Devise::TestHelpers


  def setup
    @user = User.first
    sign_in(@user)
  end

  test "should get index return 200" do
    get :index
    assert_response :success
  end

  test "get index should return 302" do
    sign_out(@user)
    get :index
    assert_response :redirect
    assert_redirected_to new_user_session_path
  end

  test "should render correct template" do
    get :index
    assert_template :index
    get :new
    assert_template :new
  end

  test 'should render 302' do
    get :edit, id: 1
    assert_response :redirect
  end
end

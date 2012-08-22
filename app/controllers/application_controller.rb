class ApplicationController < ActionController::Base
  protect_from_forgery

  def render_404
    render :file => "#{Rails.root}/public/404.html", :status => 404
  end

end

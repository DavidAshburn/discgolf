class ApplicationController < ActionController::Base

  def after_sign_in_path_for(resource)
    home_profile_path
  end

end

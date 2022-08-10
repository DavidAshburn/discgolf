class HomeController < ApplicationController
  def index
  end
  def about
  end
  def profile
    if current_user.courses.first != nil
      @courses = current_user.courses
    end
  end
  def my_courses
    @courses = current_user.courses
  end
end


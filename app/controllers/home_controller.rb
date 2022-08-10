class HomeController < ApplicationController
  def index
  end
  def about
  end
  def profile
  end
  def my_courses
    redirect_to new_course_path if current_user.courses.first == nil
    @courses = current_user.courses
  end
end


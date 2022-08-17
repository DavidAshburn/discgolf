class HomeController < ApplicationController
  def index
  end
  def about
  end
  def profile
    if current_user.courses.first != nil
      @courses = current_user.courses
    else
      @courses = 0
    end

    if current_user.cards.first != nil
      @cards = current_user.cards
      @cards = @cards.reverse()
    else
      @cards = 0
    end

  end
end


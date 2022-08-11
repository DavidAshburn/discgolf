class PlayController < ApplicationController
  def scorecard
    @variant = Variant.find_by(id: params[:variant_id])
    @par_list = []
    @par_list.push(@variant.one,@variant.two,@variant.three,@variant.four,@variant.five,@variant.six,@variant.seven,@variant.eight,@variant.nine)
  end
  def around
    @variant = Variant.first
  end
end

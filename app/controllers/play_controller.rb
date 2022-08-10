class PlayController < ApplicationController
  def scorecard
    @variant = Variant.find_by(id: params[:variant_id])
  end
end

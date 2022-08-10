require "test_helper"

class PlayControllerTest < ActionDispatch::IntegrationTest
  test "should get scorecard" do
    get play_scorecard_url
    assert_response :success
  end
end

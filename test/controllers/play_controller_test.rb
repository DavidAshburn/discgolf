require "test_helper"

class PlayControllerTest < ActionDispatch::IntegrationTest
  test "should get around" do
    get play_around_url
    assert_response :success
  end
end

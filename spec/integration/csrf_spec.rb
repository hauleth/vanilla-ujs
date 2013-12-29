require 'spec_helper'

describe "CSRF", :type => :feature, :js => true do
  include Capybara::DSL

  it "should X-CSRF-Token to xhr post request" do
    visit "/"
    screenshot_and_open_image
  end
end
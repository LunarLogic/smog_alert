require "rails_helper"

describe Admin::SettingsController do
  describe "edit" do
    it "renders form successfully" do
      get :edit
      expect(response).to be_successful
    end
  end
end
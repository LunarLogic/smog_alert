require "rails_helper"

describe "/admin/settings" do
  describe "/edit" do
    it "is successful" do
      get '/admin/settings/edit'
      expect(response).to be_successful
    end
  end
end
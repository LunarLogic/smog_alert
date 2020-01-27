require 'rails_helper'

describe '/api/internal/organizations' do
  describe 'GET /current_data' do
    context 'when database contains an organization' do
      let!(:organization) { FactoryBot.create(:organization) }

      before do
        get current_data_api_internal_organizations_path
      end

      it 'returns json with organization data' do
        expect(response.body).to have_json_path('data')
        expect(response.body).to have_json_size(7).at_path('data')
        expect(response.body).to be_json_eql(organization.organization_name.to_json).at_path('data/name')
      end
    end
  end
end

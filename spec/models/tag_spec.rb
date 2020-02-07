require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:tag) }
    it { should validate_presence_of(:name) }
  end
end

require 'rails_helper'

RSpec.describe Measurement, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:from_date_time) }
    it { should validate_presence_of(:till_date_time) }
    it { should validate_presence_of(:date) }
    it { should validate_presence_of(:hour) }
  end
end

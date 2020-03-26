require 'rails_helper'

describe '/api/internal/tags' do
  it 'repsonds with json containing names of all tags in the database' do
    tag1 = FactoryBot.create(:tag)
    tag2 = FactoryBot.create(:tag)
    tag3 = FactoryBot.create(:tag)
    get api_internal_tags_path
    expect(response.body).to eq([tag1.name, tag2.name, tag3.name].to_json)
  end
end

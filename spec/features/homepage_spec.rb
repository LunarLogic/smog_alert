describe 'Homepage', :xchrome do # change :xchrome tag to :chrome to see tests running in Chrome browser
  before do
    Rails.application.load_seed

    visit root_path
  end

  it 'verify seeds were loaded' do
    expect(User.count).to be > 0
    expect(Location.count).to be > 0
    expect(Measurement.count).to be > 0
  end

  it 'renders react components' do
    expect(page).to have_content 'Aktualna jakość powietrza w miejscowości Zabierzów'
    expect(page).to have_content 'Jakość powietrza w gminie Zabierzów'
  end
end

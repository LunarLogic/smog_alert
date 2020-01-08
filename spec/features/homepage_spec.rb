describe 'Homepage', :xchrome do # change :xchrome tag to :chrome to see tests running in Chrome browser
  before do
    visit root_path
  end

  it 'renders react components' do
    expect(page).to have_content 'Aktualna jakość powietrza w miejscowości Zabierzów'
    expect(page).to have_content 'Jakość powietrza w gminie Zabierzów'
  end
end

require 'rails_helper'

def add_new_organization(organization)
  fill_in 'Nazwa organizacji', with: organization.organization_name
  fill_in 'Krótki opis organizacji', with: organization.description
  fill_in 'Email kontaktowy', with: organization.email
  fill_in 'Facebook', with: organization.facebook
  click_on('Zapisz dane organizacji')
end

describe 'superadmin adding organization info' do
  let(:organization) { FactoryBot.create(:organization) }
  let(:new_organization) { FactoryBot.create(:organization) }

  before :each do
    admin = FactoryBot.create(:superadmin)
    login_as(admin)
    visit admin_root_path
  end

  scenario 'add new organization' do
    visit admin_root_path
    within('.navbar-nav') do
      click_on('Organizacja')
    end
    expect(page).to have_current_path(new_admin_organization_path)
    add_new_organization(new_organization)
    expect(page).to have_content(new_organization.organization_name)
  end

  scenario 'edit an organization' do
    visit admin_organization_path(organization)
    click_on('Edytuj')
    expect(page).to have_current_path(edit_admin_organization_path(organization))
    fill_in 'Nazwa organizacji', with: 'Pollution watch'
    click_on 'Zapisz dane organizacji'
    expect(page).to have_current_path(admin_organization_path(organization))
    expect(page).to have_content('Pollution watch')
  end

  scenario 'delete an organization' do
    visit admin_organization_path(organization)
    click_on('Usuń')
    accept_confirm("Czy na pewno chcesz usunąć organizację #{organization.organization_name}?")
    expect(page).to have_current_path(admin_root_path)
    expect(Organization.last).to eql(nil)
  end
end

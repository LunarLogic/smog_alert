require 'rails_helper'

describe OrganizationPolicy do
  subject { described_class }

  permissions :update?, :create?, :destroy?, :new?, :edit? do
    it 'denies the possibility to execute those actions if user is not a superadmin' do
      expect(subject).not_to permit(User.new(role: :editor), Organization.new)
    end

    it 'permits those actions if user is a superadmin' do
      expect(subject).to permit(User.new(role: :superadmin), Organization.new)
    end
  end
end
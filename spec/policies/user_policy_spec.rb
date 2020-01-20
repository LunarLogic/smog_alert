require 'rails_helper'

describe UserPolicy do
  subject { described_class }

  permissions :update?, :create?, :destroy? do
    it 'denies the possibility to execute those actions if user is not a superadmin' do
      expect(subject).not_to permit(User.new(role: :editor), Location.new)
    end

    it 'permits those actions if user is a superadmin' do
      expect(subject).to permit(User.new(role: :superadmin), Location.new)
    end
  end
end

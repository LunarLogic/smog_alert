class UserPolicy < ApplicationPolicy
  def create?
    user.superadmin?
  end
  
  def update?
    user.superadmin?
  end
end
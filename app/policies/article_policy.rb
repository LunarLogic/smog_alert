class ArticlePolicy < ApplicationPolicy
  def publish?
    user.superadmin?
  end

  def unpublish?
    user.superadmin?
  end
end

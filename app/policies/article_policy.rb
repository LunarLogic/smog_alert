class ArticlePolicy < ApplicationPolicy
  def publish?
    user.superadmin?
  end
end
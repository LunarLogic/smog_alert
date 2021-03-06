class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :articles, dependent: :restrict_with_exception
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :omniauthable, omniauth_providers: [:google_oauth2]

  enum role: { superadmin: 0, editor: 1 }

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.find_by(email: data['email'])

    unless user
      password = Devise.friendly_token[0, 20]
      user = User.new(email: data['email'], password: password, password_confirmation: password)
      user.skip_confirmation!
      user.save
    end
    user
  end
end

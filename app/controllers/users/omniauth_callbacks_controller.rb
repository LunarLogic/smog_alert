class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])
    # byebug
    if @user.persisted? && @user.admin?
      flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
      sign_in @user, event: :authentication
      redirect_to admin_root_path
    elsif @user.persisted?
      flash[:notice] = 'Skontaktuj się z adminem strony w celu uzyskania dostępu do panelu'
      sign_in @user
      redirect_to new_user_registration_url
    else
      session['devise.google_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  end
end

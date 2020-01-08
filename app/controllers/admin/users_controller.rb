class Admin::UsersController < Admin::BaseController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'Użytkownik został dodany'
      redirect_to admin_users_path
    else
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    flash[:notice] = 'Zmiany zostały zapisane'
    redirect_to admin_users_path
  end

  def edit
    @user = User.find(params[:id])
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    flash[:notice] = 'Użytkownik został usunięty'
    redirect_to admin_users_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :admin)
  end
end

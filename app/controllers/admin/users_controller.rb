class Admin::UsersController < Admin::BaseController
  after_action :verify_authorized, except: [:index, :show]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
    authorize @user
  end

  def create
    @user = User.new(user_params)
    authorize @user
    if @user.save
      flash[:notice] = 'Użytkownik został dodany'
      redirect_to admin_users_path
    else
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])
    authorize @user
    @user.update!(user_params)
    flash[:notice] = 'Zmiany zostały zapisane'
    redirect_to admin_users_path
  end

  def edit
    @user = User.find(params[:id])
    authorize @user
  end

  def destroy
    @user = User.find(params[:id])
    authorize @user
    @user.destroy
    flash[:notice] = 'Użytkownik został usunięty'
    redirect_to admin_users_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :admin, :role)
  end
end

class Admin::OrganizationsController < Admin::BaseController
  after_action :verify_authorized, except: [:show]
  
  def show
    @organization = Organization.find(params[:id])
  end
  
  def new
    @organization = Organization.new
    authorize @organization
  end

  def create
    @organization = Organization.new(organization_params)
    authorize @organization
    @organization.logo.attach(params[:organization][:logo])
    @organization.illustration.attach(params[:organization][:illustration])
    @organization.map.attach(params[:organization][:map])
    if @organization.save
      flash[:notice] = 'Dane organizacji zostały zapisane'
      redirect_to admin_organization_path(@organization)
    else
      render 'new'
    end
  end

  def edit
    @organization = Organization.find(params[:id])
    authorize @organization
  end

  def update
    @organization = Organization.find(params[:id])
    authorize @organization
    @organization.update!(organization_params)
    flash[:notice] = 'Dane organizacji zostały zaktualizowane'
    redirect_to admin_organization_path(@organization)
  end

  def destroy
    @organization = Organization.find(params[:id])
    authorize @organization
    @organization.destroy
    flash[:notice] = 'Dane organizacji zostały usunięte'
    redirect_to admin_root_path
  end

  private

  def organization_params
    params.require(:organization)
      .permit(:organization_name, :description, :email, :facebook, :logo, :illustration, :map)
  end
end

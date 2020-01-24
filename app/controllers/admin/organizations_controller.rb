class Admin::OrganizationsController < Admin::BaseController
  def show
    @organization = Organization.find(params[:id])
  end
  
  def new
    @organization = Organization.new
  end

  def create
    @organization = Organization.new(organization_params)
    @organization.logo.attach(params[:organization][:logo])
    @organization.illustration.attach(params[:organization][:illustration])
    @organization.map.attach(params[:organization][:map])
    if @organization.save
      flash[:notice] = 'Dane organizacji zostały zapisane'
      redirect_to admin_organizations_path
    else
      render 'new'
    end
  end

  def edit
    @organization = Organization.find(params[:id])
  end

  def update
    @organization = Organization.find(params[:id])
    @organization.update!(organization_params)
    flash[:notice] = 'Dane organizacji zostały zaktualizowane'
    redirect_to admin_organizations_path
  end

  def destroy
    @organization = Organizarion.find(params[:id])
    @organization.destroy
    flash[:notice] = 'Dane organizacji zostały usunięte'
    redirect_to admin_organizations_path
  end

  private

  def organization_params
    params.require(:organization)
      .permit(:organization_name, :description, :email, :facebook, :logo, :illustration, :map)
  end
end

class API::Internal::ContactFormController < API::Internal::BaseController
  skip_before_action :verify_authenticity_token
  def create
    input = ContactFormValidator.new.call(contact_form_params)
    render json: { errors: input }
  end 

  private

  def contact_form_params
    params.require(:contact_form).permit(:message, :sender_name, :sender_email)
  end
end
class API::Internal::ContactFormController < API::Internal::BaseController
  skip_before_action :verify_authenticity_token
  def create
    data = ContactFormValidator.new.call(contact_form_params)
    if data != {}
      render json: { errors: data }
    else # no errors
      # ContactMailer.with(contact_form_params).contact_form_email.deliver_now
      render json: { email: ContactMailer.with(contact_form_params).contact_form_email.message }
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:message, :sender_name, :sender_email)
  end
end

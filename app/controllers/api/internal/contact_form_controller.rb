class API::Internal::ContactFormController < API::Internal::BaseController
  def create
    contact_form = ContactForm.new(contact_form_params)
    if contact_form.valid?
      email = ContactMailer.with(contact_form_params).contact_form_email
      email.deliver_now
      render plain: email.message
    else
      render json: { errors: contact_form.errors.messages }
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:message, :sender_name, :sender_email)
  end
end

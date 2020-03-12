class API::Internal::ContactFormController < API::Internal::BaseController
  skip_before_action :verify_authenticity_token
  def create
    data = ContactFormValidator.new.call(contact_form_params)
    if data != {}
      render json: { errors: data }
    else # no errors
      render json: { email: contact_form_params }
    end
  end

  def prepare_email(contact_form_params)
    { email: contact_form_params }  
  end

  def send_email
    email = prepare_email(contact_form_params)
    #  if email sent 
    sender_response = EmailSender.new.call(email)
    if sender_response == "OK"
      feedback = "Your email was sent"
    else
    # if errors
      feedback = "Your email was NOT sent"
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:message, :sender_name, :sender_email)
  end
end
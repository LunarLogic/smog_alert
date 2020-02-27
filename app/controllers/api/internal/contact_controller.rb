class API::Internal::ContactController < API::Internal::BaseController
  skip_before_action :verify_authenticity_token

  def create
    cf = ContactForm.new(contact_params)
    head :ok
    puts "Sending email #{cf.inspect}"
  end


  private 

  def contact_params
    params.require(:contact).permit(:subject, :content, :sender_email, :sender_name)
  end
end
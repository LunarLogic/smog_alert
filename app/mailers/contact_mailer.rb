class ContactMailer < ApplicationMailer
  def contact_form_email
    @sender_name = params[:sender_name]
    @message = params[:message]
    @sender_email = params[:sender_email]

    # # TODO change this to proper address and subject
    mail(to: 'gmina@example.com', subject: 'Question from Smog Alert')
  end
end

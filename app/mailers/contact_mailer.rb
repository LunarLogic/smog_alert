class ContactMailer < ApplicationMailer
  def my_email
    @sender_name = params[:sender_name]
    @message = params[:message]
    @sender_email = params[:sender_email]
    mail(to: 'gmina@zabierzow.pl', subject: 'Question from Smog Alert')
  end
end

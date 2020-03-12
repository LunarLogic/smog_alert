# Preview all emails at http://localhost:3000/rails/mailers/contact_mailer
class ContactMailerPreview < ActionMailer::Preview
  def my_email
    contact_form_params = {
      sender_name: "jan kowalski",
      message: "my message",
      sender_email: "jan.kowalski@example.com"
    }
    
    ContactMailer.with(contact_form_params).my_email
  end
end

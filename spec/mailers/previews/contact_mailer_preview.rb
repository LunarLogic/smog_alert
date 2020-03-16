# Preview all emails at http://localhost:3000/rails/mailers/contact_mailer
class ContactMailerPreview < ActionMailer::Preview
  def contact_form_email
    contact_form_params = {
      sender_name: 'Jan Kowalski',
      message: 'Hello from the Smog Alert contact form!',
      sender_email: 'jan.kowalski@example.com'
    }

    ContactMailer.with(contact_form_params).contact_form_email
  end
end

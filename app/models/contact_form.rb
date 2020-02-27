class ContactForm
  include ActiveModel::Model
  attr_accessor :subject, :content, :sender_email, :sender_name
end
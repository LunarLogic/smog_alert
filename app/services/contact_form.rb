class ContactForm
  include ActiveModel::Model
  attr_accessor :sender_email, :sender_name, :message
  validates :sender_email, :sender_name, :message, presence: true
  validates :sender_email, format: { with: /\A[^@\s]+@[^@\s]+\z/ }, allow_blank: true
end

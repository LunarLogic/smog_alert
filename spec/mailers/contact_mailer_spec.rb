require 'rails_helper'

RSpec.describe ContactMailer, type: :mailer do
  describe 'create' do
    let(:params) { { sender_name: 'Test Sender', sender_email: 'test@example.com', message: 'Test message' } }
    let(:mail) { ContactMailer.with(params).contact_form_email }

    it 'renders headers' do
      expect(mail.from).to eq(['from@example.com'])
      expect(mail.to).to eq(['gmina@example.com'])
      expect(mail.subject).to eq('Question from Smog Alert')
    end

    it 'renders the body' do
      expect(mail.body.encoded).to include(params[:sender_email])
      expect(mail.body.encoded).to include(params[:sender_name])
      expect(mail.body.encoded).to include(params[:message])
      expect(mail.body.encoded).to include('This message was sent from Smog Alert contact form')
    end
  end
end

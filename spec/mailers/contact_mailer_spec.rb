require 'rails_helper'

RSpec.describe ContactMailer, type: :mailer do
  describe '#contact_form_email' do
    let(:params) { { sender_name: 'Test Sender', sender_email: 'test@example.com', message: 'Test message' } }
    subject { described_class.with(params).contact_form_email }

    it 'renders headers' do
      expect(subject.from).to eq(['from@example.com'])
      expect(subject.to).to eq(['gmina@example.com'])
      expect(subject.subject).to eq('Question from Smog Alert')
    end

    it 'renders the body' do
      expect(subject.body.encoded).to include(params[:sender_email])
      expect(subject.body.encoded).to include(params[:sender_name])
      expect(subject.body.encoded).to include(params[:message])
      expect(subject.body.encoded).to include('This message was sent from Smog Alert contact form')
    end
  end
end

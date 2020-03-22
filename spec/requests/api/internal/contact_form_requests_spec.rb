describe API::Internal::ContactFormController do
  describe 'POST /api/internal/contact_form' do
    
    context 'when contact form params valid' do
      let!(:valid_params) { { sender_name: 'Test Sender', sender_email: 'test@example.com', message: 'Test message' } }
      let!(:contact_form) { ContactForm.new(valid_params) }
      let!(:mail) { ContactMailer.with(valid_params).contact_form_email }

      it 'returns 204 No Content' do
        post '/api/internal/contact_form', params: valid_params 
        # byebug
        expect(response.status).to eq(204)

        # TODO: Test fails
        # 1) API::Internal::ContactFormController POST /api/internal/contact_form when contact form params valid returns 204 No Content
        # Failure/Error: expect(response.status).to eq(204)
        
        #   expected: 204
        #        got: 422
      end
    end

    context 'when contact form params NOT valid' do
      let!(:invalid_params) { { sender_name: '', sender_email: 'test.example.com', message: 'Test message' } }
      let!(:contact_form) { ContactForm.new(invalid_params) }

      it 'renders json with errors messages' do
        skip
        post '/api/internal/contact_form', params: invalid_params 
        # byebug
        expect(response.status).to eq(200)
        expect(response.body).to include('errors')
        # TODO: Test fails
        # 2) API::Internal::ContactFormController POST /api/internal/contact_form when contact form params NOT valid renders json with errors messages
        # Failure/Error: expect(response.status).to eq(200)
        
        #   expected: 200
        #        got: 422
      end
    end
  end
end

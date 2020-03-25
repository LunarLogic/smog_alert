describe API::Internal::ContactFormController do
  describe 'POST /api/internal/contact_form' do
    context 'when contact form params valid' do
      let!(:valid_params) do
        {
          contact_form: {
            sender_name: 'Test Sender',
            sender_email: 'test@example.com',
            message: 'Test message',
          }
        }
      end

      it 'returns 204 No Content' do
        post '/api/internal/contact_form', params: valid_params

        expect(response.status).to eq(204)
      end
    end

    context 'when contact form params NOT valid' do
      let!(:invalid_params) do
        {
          contact_form: {
            sender_name: '',
            sender_email: 'test.example.com',
            message: 'Test message',
          }
        }
      end

      before { post '/api/internal/contact_form', params: invalid_params }

      it 'returns 200 OK status' do
        expect(response.status).to eq(200)
      end

      it 'renders json with errors messages' do
        expect(response.body).to include('errors')
        expect(response.body).to eq(
          {
            errors:
              { sender_name: ['nie może być puste'],
                sender_email: ['jest nieprawidłowe'] }
          }.to_json,
        )
      end
    end
  end
end

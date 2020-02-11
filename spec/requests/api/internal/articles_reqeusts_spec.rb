include Rails.application.routes.url_helpers

describe API::Internal::ArticlesController do
  describe 'GET /api/internal/articles' do
    describe '#index'
    context 'when no published articles in DB' do
      let!(:article) { create(:article, published: false, published_at: nil) }

      before do
        get api_internal_articles_path
      end

      it do
        expect(response.body).to be_json_eql({ data: [] }.to_json)
      end
    end

    context 'when published articles in DB' do
      let!(:not_published_article) { create(:article, published: false, published_at: nil) }
      let!(:published_article_without_image) do
        create(:article, published: true, published_at: Time.current,
                         updated_at: Time.current - 2.days)
      end
      let!(:published_article_with_image) do
        FactoryBot.create(:article, body: '#', published: true,
                                    published_at: Time.current)
      end

      context 'when article without image' do
        before do
          get api_internal_articles_path
        end
        it 'returns image: nil when article has no image' do
          expect(response.body).to be_json_eql({
            id: published_article_without_image.id,
            title: published_article_without_image.title,
            image: nil,
            overview: published_article_without_image.overview,
            published_at: published_article_without_image.published_at,
            updated_at: published_article_without_image.updated_at
          }.to_json).at_path('data/1')
        end
      end

      context 'when article with image' do
        before do
          Rails.application.routes.default_url_options[:host] = 'smogalert.test'
          published_article_with_image.body = html_with_image
          published_article_with_image.save
          get api_internal_articles_path
        end
        it 'returns an image when article has one' do
          expect(response.body).to be_json_eql({
            id: published_article_with_image.id,
            title: published_article_with_image.title,
            image: published_article_with_image.body,
            overview: published_article_with_image.overview,
            published_at: published_article_with_image.published_at,
            updated_at: published_article_with_image.updated_at
          }.to_json).excluding('image').at_path('data/0')

          expect(response.body).to include_json('kitten2.png'.to_json).at_path('data/0/image')
        end
      end
    end
  end
end

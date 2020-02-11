include Rails.application.routes.url_helpers

describe API::Internal::ArticlesController do
  describe 'GET /api/internal/articles' do
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
      let!(:published_article_without_image) { create(:article, published: true, published_at: Time.current, updated_at: Time.current - 2.days) }
      let!(:published_article_with_image) { FactoryBot.create(:article_with_image, published: true, published_at: Time.current) }

      before do
        get api_internal_articles_path
      end

      it 'returns image: nil when article has no image' do
        image = published_article_without_image.body.embeds.find(&:image?)

        expect(response.body).to be_json_eql({
          id: published_article_without_image.id,
          title: published_article_without_image.title,
          image: image,
          overview: published_article_without_image.overview,
          published_at: published_article_without_image.published_at,
          updated_at: published_article_without_image.updated_at
        }.to_json).at_path('data/1')
      end
      it 'returns an image when article has one' do
        p published_article_with_image.published_at.as_json
        expect(response.body).to be_json_eql({
          id: published_article_with_image.id,
          title: published_article_with_image.title,
          image: published_article_with_image.body.body,
          overview: published_article_with_image.overview,
          published_at: published_article_with_image.published_at,
          updated_at: published_article_with_image.updated_at
        }.to_json).at_path('data/0')
      end
    end
  end
end

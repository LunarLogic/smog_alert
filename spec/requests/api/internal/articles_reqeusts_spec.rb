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
      let!(:published_article) { create(:article, published: true, published_at: Time.current) }

      before do
        get api_internal_articles_path
      end

      it do
        expect(response.body).to be_json_eql({
          id: published_article.id,
          title: published_article.title,
          body: published_article.body.to_s,
          published: published_article.published,
          published_at: published_article.published_at,
          updated_at: published_article.updated_at,
          created_at: published_article.created_at,
        }.to_json).at_path('data/0')
      end
    end
  end
end

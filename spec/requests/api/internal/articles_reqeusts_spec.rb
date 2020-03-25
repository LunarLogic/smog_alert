describe API::Internal::ArticlesController do
  describe 'GET /api/internal/articles' do
    let!(:editor) { create(:editor, id: 2) }

    context 'when no published articles in DB' do
      let!(:article) { create(:article, published: false, published_at: nil, user: editor) }

      before { get api_internal_articles_path }
      it 'returns no data' do
        expect(response.body).to have_json_path('meta')
        expect(response.body).to be_json_eql({
          data: [],
          meta: {
            pagination: {
              per_page: 5,
              total_pages: 0,
              total_objects: 0,
              prev_page: nil,
              current_page: 1,
              next_page: nil,
              is_first_page: true,
              is_last_page: false,
              is_page_out_of_range: true
            }
          }
        }.to_json)
      end
    end

    context 'when published articles in DB' do
      let!(:not_published_article) { create(:article, published: false, published_at: nil, user: editor) }
      let!(:published_article_without_image) do
        create(:article, published: true, published_at: Time.current,
                         updated_at: Time.current - 2.days, user: editor)
      end
      let!(:published_article_with_image) do
        FactoryBot.create(:article, body: '#', published: true,
                                    published_at: Time.current, user: editor)
      end

      context 'when pagination params provided' do
        before { get api_internal_articles_path(page: 2, per_page: 2) }

        it 'returns meta with pagination params values' do
          expect(response.body).to have_json_path('meta')
          expect(response.body).to be_json_eql(2).at_path('meta/pagination/per_page')
          expect(response.body).to be_json_eql(2).at_path('meta/pagination/current_page')
        end
      end

      context 'when pagination params NOT provided' do
        before { get api_internal_articles_path }

        it 'returns meta with pagination default values' do
          expect(response.body).to have_json_path('meta')
          expect(response.body).to be_json_eql(5).at_path('meta/pagination/per_page')
          expect(response.body).to be_json_eql(1).at_path('meta/pagination/current_page')
        end
      end

      context 'when article without image' do
        before { get api_internal_articles_path }

        it 'returns image: nil when article has no image' do
          expect(response.body).to be_json_eql({
            id: published_article_without_image.id,
            title: published_article_without_image.title,
            image: nil,
            overview: published_article_without_image.overview,
            tags: published_article_without_image.tags.map(&:name),
            published_at: published_article_without_image.published_at,
            updated_at: published_article_without_image.updated_at
          }.to_json).at_path('data/1')
        end
      end

      context 'when article with image' do
        before do
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
            tags: published_article_with_image.tags.map(&:name),
            published_at: published_article_with_image.published_at,
            updated_at: published_article_with_image.updated_at
          }.to_json).excluding('image').at_path('data/0')

          expect(response.body).to include_json('kitten2.png'.to_json).at_path('data/0/image')
        end
      end
    end
  end

  describe 'GET /api/internal/articles/:id' do
    let!(:editor) { create(:editor, id: 2) }

    before { get "/api/internal/articles/#{article_id}" }

    context 'when article is not published' do
      let(:article) { create(:article, published: false, published_at: nil, user: editor) }
      let(:article_id) { article.id }

      it 'raises an error' do
        expect(response.body).to be_json_eql(nil.to_json).at_path('data')
        expect(response.body).to be_json_eql(
          "Couldn't find Article with 'id'=#{article.id} [WHERE \"articles\".\"published\" = $1]"
          .to_json,
        ).at_path('errors/0')
      end
    end

    context 'when article in DB AND published' do
      let(:tag) { create(:tag) }
      let(:article) { create(:article, published: true, published_at: Time.current, user: editor, tags: [tag]) }
      let(:article_id) { article.id }

      it 'returns an article' do
        expect(response.body).to be_json_eql({
          id: article.id,
          title: article.title,
          body: article.body.to_s,
          tags: article.tags.map(&:name),
          published_at: article.published_at,
          updated_at: article.updated_at
        }.to_json).at_path('data')
      end
    end
  end
end

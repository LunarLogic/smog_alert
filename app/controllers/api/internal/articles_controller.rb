class API::Internal::ArticlesController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/api/internal/articles' do
    operation :get do
      key :summary, 'Get all published articles'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'articles',
      ]
      response 200 do
        key :description, 'Array of articles'
        schema do
          key :type, :object
          property :data do
            key :type, :array
            items do
              property :id do
                key :type, :integer
              end
              property :title do
                key :type, :string
              end
              property :image do
                key :type, :string
              end
              property :overview do
                key :type, :string
              end
              property :published_at do
                key :type, :string
              end
              property :updated_at do
                key :type, :string
              end
            end
          end
        end
      end
    end
  end

  swagger_path '/api/internal/articles/{id}' do
    operation :get do
      key :summary, 'Get published article by ID'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'articles',
      ]
      parameter do
        key :name, :id
        key :description, 'Article ID'
        key :in, :path
        key :required, true
        key :type, :integer
      end
      response 200 do
        key :description, 'Article'
        schema do
          key :type, :object
          property :data do
            key :type, :object
            property :id do
              key :type, :integer
            end
            property :title do
              key :type, :string
            end
            property :body do
              key :type, :string
            end
            property :published_at do
              key :type, :string
            end
            property :updated_at do
              key :type, :string
            end
          end
        end
      end
      response 404 do
        key :description, 'Article not found'
        schema do
          key :type, :object
          property :data do
            key :type, :string
            key :description, 'Default value is null'
          end
          property :errors do
            key :type, :array
            items do
              key :type, :string
            end
          end
        end
      end
    end
  end

  def index
    data = ArticlesRepository.new.published_articles.map do |article|
      API::Internal::ArticleOverviewPresenter.new(article)
    end

    render json: { data: data }
  end

  def show
    article = ArticlesRepository.new.published_articles.find(params[:id])
    data = API::Internal::ArticlePresenter.new(article)

    render json: { data: data }
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :overview, :user_id)
  end
end

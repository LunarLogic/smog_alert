class API::Internal::ArticlesController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/api/internal/articles' do
    operation :get do
      key :summary, 'All published articles'
      key :description, 'Returns all published articles by admin'
      # key :operationId, 'findPets'
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

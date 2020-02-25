class API::Internal::ArticlesController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/pets' do
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
      parameter do
        key :name, :tags
        key :in, :query
        key :description, 'tags to filter by'
        key :required, false
        key :type, :array
        items do
          key :type, :string
        end
        key :collectionFormat, :csv
      end
      parameter do
        key :name, :limit
        key :in, :query
        key :description, 'maximum number of results to return'
        key :required, false
        key :type, :integer
        key :format, :int32
      end
      response 200 do
        key :description, 'pet response'
        schema do
          key :type, :array
          items do
            # key :'$ref', :Pet
          end
        end
      end
      response :default do
        key :description, 'unexpected error'
        schema do
          # key :'$ref', :ErrorModel
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

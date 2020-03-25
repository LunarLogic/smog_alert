class API::Internal::ArticlesController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/api/internal/articles' do
    operation :get do
      key :summary, 'Get set of published articles'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'articles',
      ]
      parameter do
        key :name, :per_page
        key :description, 'Number of articles per page'
        key :in, :path
        key :required, false
        key :type, :integer
        key :default, 5
      end
      parameter do
        key :name, :page
        key :description, 'Current page number'
        key :in, :path
        key :required, false
        key :type, :integer
        key :default, 1
      end
      parameter do
        key :name, :tag
        key :in, :query
        key :description, 'Tag for filtering articles'
        key :required, false
        key :type, :string
      end
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
              property :tags do
                key :type, :array
                items do
                  key :type, :string
                end
              end
              property :published_at do
                key :type, :string
              end
              property :updated_at do
                key :type, :string
              end
            end
          end
          property :meta do
            key :type, :object
            property :pagination do
              key :type, :object
              property :per_page do
                key :type, :integer
              end
              property :total_pages do
                key :type, :integer
              end
              property :total_objects do
                key :type, :integer
              end
              property :prev_page do
                key :type, :integer
              end
              property :current_page do
                key :type, :integer
              end
              property :next_page do
                key :type, :integer
              end
              property :is_first_page do
                key :type, :boolean
              end
              property :is_last_page do
                key :type, :boolean
              end
              property :is_page_out_of_range do
                key :type, :boolean
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
            property :tags do
              key :type, :array
              items do
                key :type, :string
              end
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
    if params[:tag]
      tag = params[:tag]
      paginated_articles = articles_repository.published_articles_with_tag(tag).page(page).per(per_page)
    else
      paginated_articles = articles_repository.published_articles.page(page).per(per_page)
    end
    data = paginated_articles.map do |article|
      API::Internal::ArticleOverviewPresenter.new(article)
    end

    render json: {
      data: data,
      meta: {
        pagination: {
          per_page: per_page,
          total_pages: paginated_articles.total_pages,
          total_objects: paginated_articles.total_count,
          prev_page: paginated_articles.prev_page,
          current_page: paginated_articles.current_page,
          next_page: paginated_articles.next_page,
          is_first_page: paginated_articles.first_page?,
          is_last_page: paginated_articles.last_page?,
          is_page_out_of_range: paginated_articles.out_of_range?
        }
      }
    }
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

  def page
    @page ||= params[:page] || 1
  end

  def per_page
    @per_page ||= params[:per_page] ? params[:per_page].to_i : 5
  end

  def articles_repository
    ArticlesRepository.new
  end
end

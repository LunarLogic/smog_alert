class API::Internal::ArticlesController < API::Internal::BaseController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

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
    params.require(:article).permit(:title, :body, :overview)
  end

  def render_not_found_response(exception)
    render json: { error: exception.message }, status: :not_found
  end
end

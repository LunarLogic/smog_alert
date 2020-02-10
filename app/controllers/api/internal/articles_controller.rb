class API::Internal::ArticlesController < API::Internal::BaseController
  def index
    data = published_articles.map do |article|
      API::Internal::ArticleOverviewPresenter.new(article)
    end

    render json: { data: data }
  end

  def show
    article = published_articles.find(params[:id])
    data = API::Internal::ArticlePresenter.new(article)

    render json: { data: data }
  end

  private

  def published_articles
    Article.where(published: true).order('updated_at DESC')
  end

  def article_params
    params.require(:article).permit(:title, :body, :overview)
  end
end

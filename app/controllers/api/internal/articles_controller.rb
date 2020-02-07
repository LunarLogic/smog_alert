class API::Internal::ArticlesController < API::Internal::BaseController
  #  TODO show article by id instead of all
  def index
    articles = Article.where(published: true)
    data = articles.map do |article|
      API::Internal::ArticleOverviewPresenter.new(article)
    end

    render json: { data: data }
  end

  def show
    articles = Article.where(published: true)
    article = articles.find(params[:id])
    data = API::Internal::ArticlePresenter.new(article)

    render json: { data: data }
  end

  def article_params
    params.require(:article).permit(:title, :body)
  end
end

class API::Internal::ArticlesController < API::Internal::BaseController
  def index
    # data = ArticlesRepository.new.published_articles.map do |article|
    #   API::Internal::ArticleOverviewPresenter.new(article)
    # end
    data = Article.page(params[:page]).per(params[:per_page])

    render json:
    {
      data: data,
      meta: { pagination:
              {
                per_page: params[:per_page],
                total_pages: data.total_pages,
                total_objects: data.total_count
              } }
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
end

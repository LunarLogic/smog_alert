class API::Internal::ArticlesController < API::Internal::BaseController
  def index
    articles = Article.where(published: true)
    data = articles.map do |article|
      API::Internal::ArticlePresenter.new(article)
    end

    render json: { data: data }
  end
end

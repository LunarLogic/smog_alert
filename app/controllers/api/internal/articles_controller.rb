class API::Internal::ArticlesController < API::Internal::BaseController
  def index
    articles = Article.where(published: true)
    data = articles.map do |article|
      { id: article.id,
        title: article.title,
        body: article.body.to_s,
        published: article.published,
        published_at: article.published_at,
        updated_at: article.updated_at,
        created_at: article.created_at }
    end

    render json: { data: data }
  end
end

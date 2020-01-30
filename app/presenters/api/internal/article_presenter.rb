class API::Internal::ArticlePresenter
  def initialize(article)
    @article = article
  end

  def to_hash
    {
      id: @article.id,
      title: @article.title,
      body: @article.body.to_s,
      published: @article.published,
      published_at: @article.published_at,
      updated_at: @article.updated_at,
      created_at: @article.created_at
    }
  end
end

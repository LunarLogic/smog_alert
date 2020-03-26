class API::Internal::ArticlePresenter
  def initialize(article)
    @article = article
  end

  def to_hash
    {
      id: @article.id,
      title: @article.title,
      body: @article.body.to_s,
      tags: tags,
      published_at: @article.published_at,
      updated_at: @article.updated_at,
    }
  end

  private

  def tags
    @article.tags.map(&:name)
  end
end

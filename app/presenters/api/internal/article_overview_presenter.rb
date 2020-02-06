class API::Internal::ArticleOverviewPresenter
  def initialize(article)
    @article = article
  end

  def to(_hash)
    {
      id: @article.id,
      title: @article.title,
      image: @article.body.embeds.find(&:image?),
      overwiew: @article.body.to_plain_text[0...200],
      published_at: @article.published_at,
      updated_at: @article.updated_at
    }
  end
end

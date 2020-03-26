class ArticlesRepository
  def make_published(article)
    article.published = true
    article.published_at = Time.current
    article.save
  end

  def make_unpublished(article)
    article.published = false
    article.published_at = nil
    article.save
  end

  def published_articles
    Article.where(published: true).with_rich_text_body_and_embeds.order('updated_at DESC')
  end
end

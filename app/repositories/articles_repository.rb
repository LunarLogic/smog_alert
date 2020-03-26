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
    Article.where(published: true).order('updated_at DESC')
  end

  def published_articles_with_tag(tag)
    Article.includes(:tags).where(articles: { published: true }, tags: { name: tag })
  end
end

class ArticleUpdater
  def initialize(article)
    @article = article
  end

  def call(params)
    manage_tags(params[:tags_attributes])
    save_article(params[:title], params[:body])
  end

  def manage_tags(tags_attributes)
    edit_tags(tags_attributes)
    delete_tags(tags_attributes)
  end

  def save_article(title, body)
    @article.title = title
    @article.body = body
  end

  def edit_tags(tags_attributes)
  end

  def delete_tags(tags_attributes)
    ids = tags_attributes.present? ? tags_attributes.map { |tag| tag[:id] } : nil
    Tagging.where(article_id: @article.id).where.not(tag_id: ids).delete_all
    Tag.left_outer_joins(:taggings).where('tag_id is null').delete_all
  end
end

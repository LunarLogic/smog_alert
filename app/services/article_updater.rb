class ArticleUpdater
  def initialize(article)
    @article = article
  end

  def call(params)
    manage_tags(params[:tags_attributes])
  end

  def manage_tags(tags_attributes)
    tags_to_stay_ids = tags_attributes.present? ? tags_attributes.map { |tag| tag[:id] } : nil
    delete_tags(tags_to_stay_ids)
  end

  def save_article(title, body)
  end

  def delete_tags(ids)
    Tagging.where(article_id: @article.id).where.not(tag_id: ids).delete_all
    Tag.left_outer_joins(:taggings).where('tag_id is null').delete_all
  end
end

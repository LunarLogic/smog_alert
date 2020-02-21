class ArticleUpdater
  def initialize(article)
    @article = article
  end

  def call(params)
    manage_tags(params[:tags_attributes])
    save_article(params[:title], params[:body])
  end

  def manage_tags(tags_attributes)
    tags_names = tags_attributes.present? ? tags_attributes.map { |tag| tag[:name] } : []
    update_tags(tags_names)
    delete_tags(tags_names)
  end

  def save_article(title, body)
    @article.title = title
    @article.body = body
  end

  def update_tags(tags_names)
    existing_tags_names = @article.tags.pluck(:name)
    new_tags_names = tags_names - existing_tags_names
    new_tags_names.each do |name|
      @article.tags.create!(name: name)
    end
  end

  def delete_tags(tags_names)
    ids = Tag.where(name: tags_names).pluck(:id)
    Tagging.where(article_id: @article.id).where.not(tag_id: ids).delete_all
    Tag.left_outer_joins(:taggings).where('tag_id is null').delete_all
  end
end

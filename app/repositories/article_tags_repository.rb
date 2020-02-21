class ArticleTagsRepository
  def update_article_tags(article, tags_names)
    create_new_tags(article, tags_names)
    delete_taggings(article, tags_names)
    delete_obsolete_tags
  end

  def create_new_tags(article, tags_names)
    existing_tags_names = article.tags.pluck(:name)
    new_tags_names = tags_names - existing_tags_names
    new_tags_names.each do |name|
      article.tags.create!(name: name)
    end
  end

  def delete_taggings(article, tags_names)
    ids = Tag.where(name: tags_names).pluck(:id)
    Tagging.where(article_id: article.id).where.not(tag_id: ids).delete_all
  end

  def delete_obsolete_tags
    Tag.left_outer_joins(:taggings).where('tag_id is null').delete_all
  end
end

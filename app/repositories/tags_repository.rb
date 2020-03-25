class TagsRepository
  def tags_names
    Tag.pluck(:name)
  end

  def all_tags
    Tag.all
  end
end

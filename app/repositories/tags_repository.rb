class TagsRepository
  def tags_names
    Tag.pluck(:name)
  end
end

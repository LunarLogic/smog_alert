class Admin::TagsController < Admin::BaseController
  def names
    tags_names = tags_repository.tags_names
    render json: tags_names
  end

  private

  def tags_repository
    TagsRepository.new
  end
end

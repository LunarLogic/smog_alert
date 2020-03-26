class API::Internal::TagsController < API::Internal::BaseController
  include Swagger::Blocks

  def index
    tags_names = tags_repository.tags_names
    render json: tags_names
  end

  private

  def tags_repository
    TagsRepository.new
  end
end

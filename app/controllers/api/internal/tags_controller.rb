class API::Internal::TagsController < API::Internal::BaseController
  include Swagger::Blocks

  def index
    tags = tags_repository.all_tags
    render json: tags
  end

  private

  def tags_repository
    TagsRepository.new
  end
end

class ArticleCreator
  def initialize(article_tags_repository: ArticleTagsRepository.new)
    @article_tags_repository = article_tags_repository
  end

  def call(user_id:, params:)
    article = create_article(user_id, params.except(:tags_attributes))
    create_tags(article, params) if article && params[:tags_attributes]
    article
  end

  private

  def create_article(id, params)
    params[:user_id] = id
    begin
      Article.create!(params)
    rescue ActiveRecord::RecordInvalid
      false
    end
  end

  def create_tags(article, params)
    tags_attributes = params[:tags_attributes]
    tags_names = tags_attributes.present? ? tags_attributes.map { |tag| tag[:name] }.uniq.reject(&:blank?) : []
    @article_tags_repository.create_new_tags(article, tags_names)
  end
end

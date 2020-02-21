class ArticleUpdater
  def initialize(article_tags_repository: ArticleTagsRepository.new)
    @article_tags_repository = article_tags_repository
  end

  def call(params)
    @article = Article.find(params[:id])
    article_params = params[:article]
    update_tags(article_params[:tags_attributes])
    update_title_and_body(article_params.except(:tags_attributes))
  end

  private

  def update_tags(tags_attributes)
    tags_names = tags_attributes.present? ? tags_attributes.map { |tag| tag[:name] }.uniq.reject(&:blank?) : []
    @article_tags_repository.update_article_tags(@article, tags_names)
  end

  def update_title_and_body(article_params)
    @article.update(article_params)
  end
end

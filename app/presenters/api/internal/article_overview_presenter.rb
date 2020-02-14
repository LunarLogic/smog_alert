class API::Internal::ArticleOverviewPresenter
  def initialize(article)
    @article = article
  end

  def to_hash
    image = @article.body.embeds.find(&:image?)
    {
      id: @article.id,
      title: @article.title,
      image: image.nil? ? nil : url_helpers.rails_blob_path(image, only_path: true),
      overview: @article.overview,
      published_at: @article.published_at,
      updated_at: @article.updated_at
    }
  end

  private

  def url_helpers
    Rails.application.routes.url_helpers
  end
end

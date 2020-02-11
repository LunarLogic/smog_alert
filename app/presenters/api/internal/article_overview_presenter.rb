class API::Internal::ArticleOverviewPresenter
  include Rails.application.routes.url_helpers

  def initialize(article)
    @article = article
  end

  def to_hash
    image = @article.body.embeds.find(&:image?)
    {
      id: @article.id,
      title: @article.title,
      image: image.nil? ? nil : rails_blob_path(image, only_path: true),
      overview: @article.overview,
      published_at: @article.published_at,
      updated_at: @article.updated_at
    }
  end
end

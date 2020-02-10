class API::Internal::ArticleOverviewPresenter
  include Rails.application.routes.url_helpers

  def initialize(article)
    @article = article
  end

  def to_hash
    {
      id: @article.id,
      title: @article.title,
      image: rails_blob_path(@article.body.embeds.find(&:image?), only_path: true),
      overview: @article.overview,
      published_at: @article.published_at,
      updated_at: @article.updated_at
      # TODO: add author
    }
  end
end

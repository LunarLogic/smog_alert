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
      # TODO: add overview column for article model
      # overview: @article.body.to_plain_text[0...200],
      # overview: @article.overview,
      published_at: @article.published_at,
      updated_at: @article.updated_at
    }
  end
end

class API::Internal::ArticlesController < API::Internal::BaseController
  def index
    paginated_articles = ArticlesRepository.new.published_articles.page(page).per(per_page)
    data = paginated_articles.map do |article|
      API::Internal::ArticleOverviewPresenter.new(article)
    end

    render json: {
      data: data,
      meta: {
        pagination: {
          per_page: per_page,
          total_pages: paginated_articles.total_pages,
          total_objects: paginated_articles.total_count,
          prev_page: paginated_articles.prev_page,
          current_page: paginated_articles.current_page,
          next_page: paginated_articles.next_page,
          is_first_page: paginated_articles.first_page?,
          is_last_page: paginated_articles.last_page?,
          is_page_out_of_range: paginated_articles.out_of_range?
        }
      }
    }
  end

  def show
    article = ArticlesRepository.new.published_articles.find(params[:id])
    data = API::Internal::ArticlePresenter.new(article)

    render json: { data: data }
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :overview, :user_id)
  end

  def page
    @page ||= params[:page] || 1
  end

  def per_page
    @per_page ||= params[:per_page] ? params[:per_page].to_i : 5
  end
end

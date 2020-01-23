class Admin::ArticlesController < Admin::BaseController
  after_action :verify_authorized, except: [:index, :new, :create, :show, :edit, :update]

  def index
    @articles = Article.order('created_at DESC').page(params[:page])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      flash[:success] = 'Pomyślnie dodano wpis'
      redirect_to admin_articles_path
    else
      render 'new'
    end
  end

  def show
    @article = Article.find(params[:id])
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      flash[:success] = 'Pomyslnie edytowano wpis'
      redirect_to admin_articles_path
    else
      render 'edit'
    end
  end

  def destroy
    @article = Article.find(params[:id])
    authorize @article
    @article.destroy
    flash[:success] = 'Pomyślnie usunięto wpis'
    redirect_to admin_articles_path
  end

  def publish
    @article = Article.find(params[:id])
    authorize @article
    @article.make_published
    if @article.published
      @article.save
      flash[:success] = 'Pomyślnie opublikowano wpis'
    else
      flash[:failure] = 'Nie udało się opublikować wpisu'
    end
    redirect_to admin_articles_path
  end

  def unpublish
    @article = Article.find(params[:id])
    authorize @article
    @article.make_unpublished
    if @article.published
      flash[:failure] = 'Nie udało się cofnąć publikacji wpisu'
    else
      @article.save
      flash[:success] = 'Pomyślnie cofnięto publikację wpisu'
    end
    redirect_to admin_articles_path
  end

  private

  def article_params
    params.require(:article).permit(:title, :body)
  end
end

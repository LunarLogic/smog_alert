class Admin::ArticlesController < Admin::BaseController
  before_action :find_article, except: [:index, :new, :create]
  before_action :check_authorization, only: [:destroy, :publish, :unpublish]
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
    find_article
  end

  def edit
    find_article
  end

  def update
    find_article
    if @article.update(article_params)
      flash[:success] = 'Pomyslnie edytowano wpis'
      redirect_to admin_articles_path
    else
      render 'edit'
    end
  end

  def destroy
    find_article
    check_authorization
    @article.destroy
    flash[:success] = 'Pomyślnie usunięto wpis'
    redirect_to admin_articles_path
  end

  def publish
    find_article
    check_authorization
    if articles_repository.make_published(@article)
      flash[:success] = 'Pomyślnie opublikowano wpis'
    else
      flash[:failure] = 'Nie udało się opublikować wpisu'
    end
    redirect_to admin_articles_path
  end

  def unpublish
    find_article
    check_authorization
    if articles_repository.make_unpublished(@article)
      flash[:success] = 'Pomyślnie cofnięto publikację wpisu'
    else
      flash[:failure] = 'Nie udało się cofnąć publikacji wpisu'
    end
    redirect_to admin_articles_path
  end

  private

  def find_article
    @article = Article.find(params[:id])
  end

  def check_authorization
    authorize @article
  end

  def articles_repository
    ArticlesRepository.new
  end

  def article_params
    params.require(:article).permit(:title, :body)
  end
end

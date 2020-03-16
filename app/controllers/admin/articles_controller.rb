class Admin::ArticlesController < Admin::BaseController
  before_action :find_article, except: [:index, :new, :create, :update]
  before_action :check_authorization, only: [:destroy, :publish, :unpublish]
  after_action :verify_authorized, except: [:index, :new, :create, :show, :edit, :update]

  def index
    @articles = Article.order('created_at DESC').page(params[:page])
  end

  def new
    @article = Article.new
    @tags_names = Tag.pluck(:name)
  end

  def create
    @article = article_creator.call(user_id: current_user.id, params: article_params)
    if @article.persisted?
      flash[:success] = 'Pomyślnie dodano wpis'
      redirect_to admin_articles_path
    else
      render 'new'
    end
  end

  def show
  end

  def edit
    @tags_names = Tag.pluck(:name)
  end

  def update
    @article = article_updater.call(article: article_params, id: params[:id])
    if @article.valid?
      flash[:success] = 'Pomyslnie edytowano wpis'
      redirect_to admin_articles_path
    else
      render 'edit'
    end
  end

  def destroy
    @article.destroy
    article_tags_repository.delete_obsolete_tags
    flash[:success] = 'Pomyślnie usunięto wpis'
    redirect_to admin_articles_path
  end

  def publish
    if articles_repository.make_published(@article)
      flash[:success] = 'Pomyślnie opublikowano wpis'
    else
      flash[:error] = 'Nie udało się opublikować wpisu'
    end
    redirect_to admin_articles_path
  end

  def unpublish
    if articles_repository.make_unpublished(@article)
      flash[:success] = 'Pomyślnie cofnięto publikację wpisu'
    else
      flash[:error] = 'Nie udało się cofnąć publikacji wpisu'
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

  def article_tags_repository
    ArticleTagsRepository.new
  end

  def article_params
    params.require(:article).permit(:title, :body, :overview, :user_id, tags_attributes: [:name])
  end

  def article_creator
    ArticleCreator.new
  end

  def article_updater
    ArticleUpdater.new
  end
end

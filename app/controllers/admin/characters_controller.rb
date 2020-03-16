class Admin::CharactersController < Admin::BaseController
  def new
    @character = Character.new
    @book = @character.books.build
  end

  def create
    result = BookCharactersCreator.new.call(character_params, book_params)

    if result.status
      redirect new_admin_character_path, flash: { notice: 'Created!' }
    else
      @character = result.character
      @book = result.book
      render :new
    end
  end

  private

  def character_params
    params.require(:character).except(:boook).permit(:first_name, :last_name)
  end

  def book_params
    params.require(:character).require(:book).permit(:title, :description, :author, :number_of_pages, :publishment_year)
  end
end

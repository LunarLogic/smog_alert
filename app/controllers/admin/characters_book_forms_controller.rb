class Admin::CharactersBookFormsController < Admin::BaseController
  def new
    @characters_book_form = CharactersBookForm.new
  end

  def create
    @characters_book_form = CharactersBookForm.new(form_params)
    
    if @characters_book_form.save
      redirect_to root_url, notice: 'Postać zapisana'
    else
      render :new
    end
  end

  private

  def form_params
    params.require(:characters_book_form).permit(:first_name, :last_name, :title, :description, :author, :number_of_pages, :publishment_year)
  end
end

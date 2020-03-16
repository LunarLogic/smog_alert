class CharactersBookForm
  include ActiveModel::Model

  attr_accessor(
    :first_name,
    :last_name,
    :title,
    :description,
    :author,
    :number_of_pages,
    :publishment_year
  )

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :title, presence: true
  validates :description, presence: true
  validates :number_of_pages, presence: true
  validates :publishment_year, presence: true

  def save
    return false if invalid?

    ActiveRecord::Base.transaction do
      character = Character.create!(first_name: first_name, last_name: last_name)
      book = Book.create!(title: title, description: description, author: author, number_of_pages: number_of_pages, publishment_year: publishment_year)
      character.books << book
    end
  end
end

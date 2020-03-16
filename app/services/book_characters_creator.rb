class BookCharactersCreator
  def initialize
  end

  def call(character_params, book_params)
    character = Character.new(character_params)
    book = Book.new(book_params)
    if character.save      
      if book.save
        book.characters << character
        return Result.new(status: true, character: character, book: book)
      else
        return Result.new(status: false, character: character, book: book)
      end
    else
      return Result.new(status: false, character: character, book: Book.new)
    end
  end

  class Result
    attr_accessor :book, :character, :status

    def initialize(status:, character:, book:)
      self.status = status
      self.character = character
      self.book = book
    end
  end
end

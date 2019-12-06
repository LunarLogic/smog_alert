module Result
  class Error < Base
    attr_reader :errors

    def initialize(errors:)
      @errors = errors
    end

    def data
      nil
    end

    def success?
      false
    end
  end
end

module Result
  class Success < Base
    attr_reader :data

    def initialize(data:)
      @data = data
    end

    def errors
      []
    end

    def success?
      true
    end
  end
end

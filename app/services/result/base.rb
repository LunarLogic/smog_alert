module Result
  class Base
    def data
      raise NotImplementedError
    end

    def errors
      raise NotImplementedError
    end

    def success?
      raise NotImplementedError
    end
  end
end

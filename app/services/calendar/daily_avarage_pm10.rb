module Calendar
  class DailyAvaragePm10
    def initialize(measurements)
      @measurements  = measurements
    end

    def call
      @measurements.average(:pm10)
    end
  end
end

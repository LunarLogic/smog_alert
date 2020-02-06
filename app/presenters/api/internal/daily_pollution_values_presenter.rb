class API::Internal::DailyPollutionValuesPresenter
  def initialize(average_measurements)
    @average_measurements = average_measurements
  end

  def to_hash
    @average_measurements.keys.map { |key| { name: key, value: @average_measurements[key] } }
  end
end

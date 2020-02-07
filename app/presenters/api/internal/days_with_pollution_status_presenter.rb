class API::Internal::DaysWithPollutionStatusPresenter
  def initialize(location, year)
    @location = location
    @year = year
    @status_days_collector = Calendar::StatusDaysCollector.new
  end

  def to_hash
    data = days_grouped_by_status.keys.map { |key| { status: key, days: days_grouped_by_status[key] } }
    {
      @year => data
    }
  end

  private

  def days_grouped_by_status
    @status_days_collector.call(@location, @year)
  end
end

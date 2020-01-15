class StatisticsRepository
  def monthly_measurements(location, starting_time)
    measurements = location.measurements.where(['till_date_time < ?', (starting_time + 1.month)])
    .where(['from_date_time >= ?', starting_time])
    measurements.empty? ? nil : measurements
  end
end

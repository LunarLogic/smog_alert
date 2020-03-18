class MeasurementsRepository
  def for_location_by_day_and_hour(location, day, hour)
    location.measurements.where(date: day, hour: hour)
  end

  def monthly_measurements(location, starting_time)
    location.measurements.where(['till_date_time < ?', (starting_time + 1.month)])
      .where(['from_date_time >= ?', starting_time])
  end

  def first_month
    Measurement.order(:date).first.date.strftime('%Y-%m')
  end
end

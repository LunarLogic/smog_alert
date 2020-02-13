class MeasurementsRepository
  def data_presence(location, day, hour)
    location.measurements.where(date: day, hour: hour)
  end
end

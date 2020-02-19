namespace :schedule do
  namespace :airly do
    desc 'Fill missing data from Airly for every location'
    task fill_missing_daily_measurements: :environment do
      puts 'Start checking missing data for locations:'
      Location.all.each do |location|
        puts location.name
        number_of_added_measurements = MissingDailyMeasurementsFiller.new(location).call
        logger.info("Filling missing daily measurements for location #{location.name} (ID: #{location.id}) task was performed. 
          Number of added measurements: #{number_of_added_measurements}.")
      end
      puts 'Done'
    end
  end
end

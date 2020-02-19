namespace :schedule do
  namespace :airly do
    desc 'Import measurements from Airly for every location'
    task import_current_measurements: :environment do
      puts 'Start importing measurements for locations:'
      Location.all.each do |location|
        puts location.name
        number_of_added_measurements = MissingDataFiller.new(location).call
        logger.info("Filling missing daily measurements for location #{location.name} (ID: #{location.id}) task was performed. Number of added measurements: #{number_of_added_measurements}.")
      end
      puts
      puts 'Done'
    end
  end
end

namespace :schedule do
  namespace :airly do
    desc 'Import measurements from Airly for every location'
    task import_current_measurements: :environment do
      puts 'Start importing measurements for locations:'
      Location.all.each do |location|
        puts location.name
        ImportLocationMeasurementsWorker.perform_async(location.id)
      end
      puts
      puts 'Done'
    end
  end
end

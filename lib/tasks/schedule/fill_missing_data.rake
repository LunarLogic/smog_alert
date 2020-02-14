namespace :schedule do
  namespace :airly do
    desc 'Fill missing data from Airly for every location'
    task fill_missing_data: :environment do
      puts 'Start checking missing data for locations:'
      Location.all.each do |location|
        puts location.name
        FillMissingDataJob.perform(location.id)
      end
      puts 'Done'
    end
  end
end

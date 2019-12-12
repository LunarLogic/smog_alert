namespace :airly do
  task data: :environment do
    ActiveRecord::Base.transaction do
      puts 'Start'
      HourlyMeasurementsJob.perform_now(Location.second.id)
      puts 'Done'
    end
  end
end
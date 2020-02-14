class FillMissingDataJob < ApplicationJob
  queue_as :default

  def perform(location_id)
    location = Location.find(location_id)
    MissingDataFiller.new(location).call
    logger.info('Filling missing data task was performed.')
  end
end

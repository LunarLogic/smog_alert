class API::Internal::MeasurementsController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/api/internal/measurements/current' do
    operation :get do
      key :summary, 'Get current measurements'
      key :description, 'Get measurements from last hour for all locations'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'measurements',
      ]
      response 200 do
        key :description, 'Array of locations with last hour measurements'
        schema do
          key :type, :object
          property :data do
            key :type, :array
            items do
              property :location_id do
                key :type, :integer
              end
              property :location_name do
                key :type, :string
              end
              property :location_street do
                key :type, :string
              end
              property :location_display_name do
                key :type, :string
              end
              property :lat do
                key :type, :integer
              end
              property :lng do
                key :type, :integer
              end
              property :status_of_locations_grouped_by_name do
                key :type, :string
                key :description, 'When missing then value is null'
              end
              property :last_hour_measurement do
                key :type, :object
                key :description, 'When missing then value is null'
                property :from_date_time do
                  key :type, :string
                end
                property :till_date_time do
                  key :type, :string
                end
                property :values do
                  key :type, :array
                  items do
                    property :name do
                      key :type, :string
                    end
                    property :value do
                      key :type, :integer
                    end
                  end
                end
                property :status do
                  key :type, :string
                end
                property :advice do
                  key :type, :string
                end
              end
            end
          end
        end
      end
    end
  end

  def current
    locations = Location.all
    data = locations.map do |location|
      last_hour_measurement = location_repository.last_hour_measurement(location)
      last_hour_measurements_by_location_name =
        location_repository.last_hour_measurements_by_location_name(location.name)
      API::Internal::LocationWithLastMeasurementPresenter.new(
        location, last_hour_measurement, last_hour_measurements_by_location_name
      )
    end
    render json: { data: data }
  end

  def calendar_daily_values
    location = Location.find(calendar_day_params[:location_id])
    date = calendar_day_params[:date]
    average_measurements = Calendar::DailyAverageValues.new.for_day(location, date)
    render json: average_measurements
  end

  def calendar_values
    location = Location.find(calendar_params[:location_id])
    year = calendar_params[:year].to_i
    daily_measurements = Calendar::DailyAverageValues.new.for_year(location, year)
    render json: { year: year, daily_average_measurements: daily_measurements }
  end

  swagger_path '/api/internal/measurements/calendar_status' do
    operation :get do
      key :summary, 'Get calendar status'
      key :description, 'Get information about days with given pollution status for a given year and location'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'measurements',
      ]
      parameter do
        key :name, :year
        key :in, :path
        key :description, 'Year for which you want to get data'
        key :required, true
        key :type, :integer
      end
      parameter do
        key :name, :location_id
        key :in, :path
        key :description, 'Id of location for which you want to get data'
        key :required, true
        key :type, :integer
      end
      response 200 do
        key :description, 'Array of objects containing days with given status for a given year'
        schema do
          key :type, :object
          property :data do
            key :type, :object
            property '2020'.to_sym do
              key :type, :array
              items do
                key :type, :object
                property :status do
                  key :type, :string
                end
                property :days do
                  key :type, :array
                  items do
                    key :type, :string
                    key :format, :date
                  end
                end
              end
            end
          end
        end
      end
    end
  end

  def calendar_status
    location = Location.find(calendar_params[:location_id])
    year = calendar_params[:year].to_i
    data = API::Internal::DaysWithPollutionStatusPresenter.new(location, year).to_hash
    render json: { data: data }
  end

  def hourly_average_for_month
    location = Location.find(hourly_stats_params[:location_id])
    date = hourly_stats_params[:date].to_date
    monthly_measurement = measurements_repository.monthly_measurements(location, date)
    data = API::Internal::HourlyAveragePollutionPresenter.new(location, date, monthly_measurement).to_hash
    render json: { data: data }
  end

  private

  def location_repository
    LocationsRepository.new
  end

  def measurements_repository
    MeasurementsRepository.new
  end

  def hourly_stats_params
    params.require(:date)
    params.require(:location_id)
    params.permit([:date, :location_id])
  end

  def calendar_params
    params.require(:year)
    params.require(:location_id)
    params.permit([:year, :location_id])
  end

  def calendar_day_params
    params.require(:date)
    params.require(:location_id)
    params.permit([:date, :location_id])
  end
end

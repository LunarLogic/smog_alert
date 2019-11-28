module AirlyAPI
  class DataExtractor
    
    def extract(airly_data)
      {
        date: Time.parse(airly_data['current']['tillDateTime']).to_date,
        hour: Time.parse(airly_data['current']['tillDateTime']).hour,
        pm10: airly_data['current']['values'].select { |e| e['name'] == 'PM10' }[0]['value'],
        pm25: airly_data['current']['values'].select { |e| e['name'] == 'PM25' }[0]['value'],
        temperature: airly_data['current']['values'].select { |e| e['name'] == 'temperature'.upcase }[0]['value'],
        humidity: airly_data['current']['values'].select { |e| e['name'] == 'humidity'.upcase }[0]['value'],
        pressure: airly_data['current']['values'].select { |e| e['name'] == 'pressure'.upcase }[0]['value'],
        from_date_time: airly_data['current']['fromDateTime'],
        till_date_time: airly_data['current']['tillDateTime']
      }
    end
  end
    
end
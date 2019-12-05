describe AirlyExtractor::MeasurementData do
  describe '.extract' do
    it 'returns nil when there are no values' do
      data = {'current' => {'values' => []}}
      expect(described_class.extract(data)).to be nil
    end
    it 'sets value to nil when there is no data for a given measurement' do
      data =
        {
          'current' =>
          {
            'fromDateTime' => '2019-12-05T14:40:59.718Z',
            'tillDateTime' => '2019-12-05T15:40:59.718Z',
            'values' =>
            [
              {
                'name' => 'PM10',
                'value' => 74.01,
              },
              {
                'name' => 'PRESSURE',
                'value' => 1022.66,
              },
              {
                'name' => 'HUMIDITY',
                'value' => 76.24,
              },
              {
                'name' => 'TEMPERATURE',
                'value' => 1.08,
              },
            ],
          },
        }
      result = {
        date: Date.new(2019, 12, 5),
        hour: 15,
        pm10: 74.01,
        pm25: nil,
        temperature: 1.08,
        humidity: 76.24,
        pressure: 1022.66,
        from_date_time: '2019-12-05T14:40:59.718Z',
        till_date_time: '2019-12-05T15:40:59.718Z',
      }
      expect(described_class.extract(data)).to eq(result)
    end
  end
end

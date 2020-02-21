class GiosScaleChecker
  def initialize(particle, value)
    @particle = particle
    @value = value
  end

  CONF = {
    pm10_edge_values: [20.0, 50.0, 80.0, 110.0, 150.0],
    pm25_edge_values: [13.0, 35.0, 55.0, 75.0, 110.0],
  }.freeze

  def call
    # rubocop:disable Layout/CaseIndentation, Layout/EndAlignment
    edge_values = case @particle
    when :pm10
      CONF[:pm10_edge_values]
    else
      CONF[:pm25_edge_values]
    end

    if @value >= 0 && @value <= edge_values[0]
      'bardzo dobry'
    elsif @value > edge_values[0] && @value <= edge_values[1]
      'dobry'
    elsif @value > edge_values[1] && @value <= edge_values[2]
      'umiarkowany'
    elsif @value > edge_values[2] && @value <= edge_values[3]
      'dostateczny'
    elsif @value > edge_values[3] && @value <= edge_values[4]
      'zły'
    else
      'bardzo zły'
    end
    # rubocop:enable Layout/CaseIndentation, Layout/EndAlignment
  end
end
class Pm10GiosScaleChecker
  def initialize(pm10)
    @pm10 = pm10
  end

  def call
    case
    when 0 <= @pm10 && @pm10 <= 20
      'bardzo dobry'
    when 20.0 < @pm10 && @pm10 <= 50
      'dobry'
    when 50.0 < @pm10 && @pm10 <= 80
      'umiarkowany'
    when 80.0 < @pm10 && @pm10 <= 110
      'dostateczny'
    when 110.0 < @pm10 && @pm10 <= 150
      'zły'
    else
      'bardzo zły'
    end
  end
end
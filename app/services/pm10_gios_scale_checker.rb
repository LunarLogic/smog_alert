class Pm10GiosScaleChecker
  def initialize(pm10)
    @pm10 = pm10
  end

  def call
    if @pm10 >= 0 && @pm10 <= 20
      'bardzo dobry'
    elsif @pm10 > 20.0 && @pm10 <= 50
      'dobry'
    elsif @pm10 > 50.0 && @pm10 <= 80
      'umiarkowany'
    elsif @pm10 > 80.0 && @pm10 <= 110
      'dostateczny'
    elsif @pm10 > 110.0 && @pm10 <= 150
      'zły'
    else
      'bardzo zły'
    end
  end
end

require 'rails_helper'

RSpec.describe GiosScaleChecker do
  describe '#call' do
    subject { giosscalechecker.call }

    context 'when pm10 value is 20' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 20) }

      it 'returns "bardzo dobry" GIOŚ status' do
        expect(subject).to eql 'doskonały'
      end
    end

    context 'when pm10 value is decimals above 20' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 20.1) }

      it 'returns "dobry" GIOŚ status' do
        expect(subject).to eql 'dobry'
      end
    end

    context 'when pm10 value is 50' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 50) }

      it 'returns "dobry" GIOŚ status' do
        expect(subject).to eql 'dobry'
      end
    end

    context 'when pm10 value is decimals above 50' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 50.1) }

      it 'returns "umiarkowany" GIOŚ status' do
        expect(subject).to eql 'średni'
      end
    end

    context 'when pm10 value is 80' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 80) }

      it 'returns "umiarkowany" GIOŚ status' do
        expect(subject).to eql 'średni'
      end
    end

    context 'when pm10 value is decimals above 80' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 80.1) }

      it 'returns "dostateczny" GIOŚ status' do
        expect(subject).to eql 'zły'
      end
    end

    context 'when pm10 value is 110' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 110) }

      it 'returns "dostateczny" GIOŚ status' do
        expect(subject).to eql 'zły'
      end
    end

    context 'when pm10 value is decimals above 110' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 110.9) }

      it 'returns "zły" GIOŚ status' do
        expect(subject).to eql 'bardzo zły'
      end
    end

    context 'when pm10 value is 150' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 150) }

      it 'returns "zły" GIOŚ status' do
        expect(subject).to eql 'bardzo zły'
      end
    end

    context 'when pm10 value is decimals above 150' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, 150.09) }

      it 'returns "bardzo zły" GIOŚ status' do
        expect(subject).to eql 'dramatyczny'
      end
    end

    context 'when pm25 value is 20' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 13) }

      it 'returns "bardzo dobry" GIOŚ status' do
        expect(subject).to eql 'doskonały'
      end
    end

    context 'when pm25 value is decimals above 13' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 13.1) }

      it 'returns "dobry" GIOŚ status' do
        expect(subject).to eql 'dobry'
      end
    end

    context 'when pm25 value is 35' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 35) }

      it 'returns "dobry" GIOŚ status' do
        expect(subject).to eql 'dobry'
      end
    end

    context 'when pm25 value is decimals above 35' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 35.1) }

      it 'returns "umiarkowany" GIOŚ status' do
        expect(subject).to eql 'średni'
      end
    end

    context 'when pm25 value is 55' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 55) }

      it 'returns "umiarkowany" GIOŚ status' do
        expect(subject).to eql 'średni'
      end
    end

    context 'when pm25 value is decimals above 55' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 55.1) }

      it 'returns "dostateczny" GIOŚ status' do
        expect(subject).to eql 'zły'
      end
    end

    context 'when pm25 value is 75' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 75) }

      it 'returns "dostateczny" GIOŚ status' do
        expect(subject).to eql 'zły'
      end
    end

    context 'when pm25 value is decimals above 75' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 75.9) }

      it 'returns "zły" GIOŚ status' do
        expect(subject).to eql 'bardzo zły'
      end
    end

    context 'when pm25 value is 110' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 110) }

      it 'returns "zły" GIOŚ status' do
        expect(subject).to eql 'bardzo zły'
      end
    end

    context 'when pm25 value is decimals above 110' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm25, 110.09) }

      it 'returns "bardzo zły" GIOŚ status' do
        expect(subject).to eql 'dramatyczny'
      end
    end

    context 'when pm10 value is nil' do
      let(:giosscalechecker) { GiosScaleChecker.new(:pm10, nil) }

      it 'returns nil as GIOŚ status' do
        expect(subject).to be_nil
      end
    end
  end
end

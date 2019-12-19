require 'rails_helper'

RSpec.describe Pm10GiosScaleChecker do
  describe '#call' do
    let(:pm10checker) { Pm10GiosScaleChecker.new(pm10) }

    subject { pm10checker.call }   

    context 'when pm10 value is 20' do
      let(:pm10) { 20 }

      it 'returns "bardzo dobry" GIOŚ status' do
        expect(subject).to eql 'bardzo dobry'
      end
    end

    context 'when pm10 value is decimals above 20' do
      let(:pm10) { 20.1 }

      it 'returns "dobry" GIOŚ status' do
        expect(subject).to eql 'dobry'
      end
    end

    context 'when pm10 value is 50' do
      let(:pm10) { 50 }

      it 'returns "dobry" GIOŚ status' do
        expect(subject).to eql 'dobry'
      end
    end

    context 'when pm10 value is decimals above 50' do
      let(:pm10) { 50.1 }

      it 'returns "umiarkowany" GIOŚ status' do
        expect(subject).to eql 'umiarkowany'
      end
    end

    context 'when pm10 value is 80' do
      let(:pm10) { 80 }

      it 'returns "umiarkowany" GIOŚ status' do
        expect(subject).to eql 'umiarkowany'
      end
    end

    context 'when pm10 value is decimals above 80' do
      let(:pm10) { 80.1 }

      it 'returns "dostateczny" GIOŚ status' do
        expect(subject).to eql 'dostateczny'
      end
    end

    context 'when pm10 value is 110' do
      let(:pm10) { 110 }

      it 'returns "dostateczny" GIOŚ status' do
        expect(subject).to eql 'dostateczny'
      end
    end

    context 'when pm10 value is decimals above 110' do
      let(:pm10) { 110.09 }

      it 'returns "zły" GIOŚ status' do
        expect(subject).to eql 'zły'
      end
    end

    context 'when pm10 value is 150' do
      let(:pm10) { 150 }

      it 'returns "zły" GIOŚ status' do
        expect(subject).to eql 'zły'
      end
    end

    context 'when pm10 value is decimals above 150' do
      let(:pm10) { 150.09 }

      it 'returns "bardzo zły" GIOŚ status' do
        expect(subject).to eql 'bardzo zły'
      end
    end
  end
end
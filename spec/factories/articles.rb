FactoryBot.define do
  factory :article do
    title { 'Article Title' }
    body { 'Article Body' }
    overview { 'Article Overview' }
  end

  factory :article_with_image, class: :Article do
    title { 'Article2 Title' }
    body { html_with_image }
    overview { 'Article2 Overview' }
  end
end

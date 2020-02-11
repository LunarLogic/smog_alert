FactoryBot.define do
  factory :article do
    title { 'Aricle Title' }
    body { 'Article Body' }
    overview { 'Article Overview' }
  end

  factory :article_with_image, class: :Article do
    title { 'Aricle2 Title' }
    body { html_with_image }
    overview { 'Article2 Overview' }
  end
end

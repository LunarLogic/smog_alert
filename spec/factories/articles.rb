FactoryBot.define do
  factory :article do
    title { 'Article Title' }
    body { 'Article Body' }
    overview { 'Article Overview' }
    tags { [] }

    factory :article_with_image do
      body { html_with_image }
    end
  end
end

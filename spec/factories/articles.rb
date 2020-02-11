FactoryBot.define do
  factory :article do
    title { 'Aricle Title' }
    body { 'Article Body' }
    overview { 'Article Overview' }

    factory :article_with_image do
      title { 'Aricle2 Title' }
      body { rails_blob_path(Faker::LoremPixel.image) }
      overview { 'Article2 Overview' }
    end
  end
end

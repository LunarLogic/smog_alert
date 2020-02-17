require 'active_record/fixtures'

module ActiveTextHelper
  def html_with_image
    attachable = create_file_blob(filename: 'kitten2.png', content_type: 'image/png')
    %(<action-text-attachment sgid="#{attachable.attachable_sgid}" caption="Captioned"></action-text-attachment>)
  end

  def create_file_blob(filename:, content_type:, metadata: nil)
    ActiveStorage::Blob.create_after_upload! io: file_fixture(filename).open, filename: filename,
                                             content_type: content_type, metadata: metadata
  end

  def content_from_html(html)
    ActionText::Content.new(html).tap(&:to_s)
  end
end

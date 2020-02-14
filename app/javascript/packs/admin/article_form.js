$(document).ready(function() {
  function attachRemoveHandlers(e) {
    $('#js-tags-fields').on('click', '.tag-field button.close', function(e) {
      e.preventDefault();
      $(this).parent('.tag-field:first').remove();
    });
  };

  $('#js-add-tag-field-button').click(function(e) {
    e.preventDefault();
    var index = $('#js-tags-fields').children().length + 1
    inputTemplate = `<div class="tag-field d-flex">
      <div class="form-group string required article_tags_name">
      <input class="form-control string required" placeholder="Dodaj tag" type="text" name="article[tags_attributes][${index}][name]">
      </div>
      <button type='button' class='close ml-2 btn-tag-field-remove' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
      </div>`;
    $('#js-tags-fields').append(inputTemplate);
  });
  attachRemoveHandlers();
})

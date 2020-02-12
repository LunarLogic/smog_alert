$(document).ready(function() {
  $('#js-add-tag-field-button').click(function(e) {
    e.preventDefault();
    var index = $('#js-new-tags-fields').children().length + 1
    inputTemplate = `<div class="form-group string required article_tags_name">
      <input class="form-control string required" placeholder="Dodaj tag" type="text" name="article[tags_attributes][${index}][name]">
      </div>`;
    $('#js-new-tags-fields').append(inputTemplate);
  });
})

$(document).ready(function() {
  function autocompleteTags() {
    let availableTags;
    const element = document.getElementById("js-tags-fields");
    if (element) {
      availableTags = JSON.parse(element.dataset.tags);
      $(".tag-input").autocomplete({
        source: availableTags
      });
    }
  }

  function attachRemoveHandlers(e) {
    $("#js-tags-fields").on("click", ".tag-field button.close", function(e) {
      e.preventDefault();
      $(this)
        .parent(".tag-field:first")
        .remove();
    });
  }

  function attachAddHandlers(e) {
    $("#js-add-tag-field-button").click(function(e) {
      e.preventDefault();
      const newTag = $("#js-tag-template").html();
      $("#js-tags-fields").append(newTag);
      autocompleteTags();
    });
  }

  attachAddHandlers();
  attachRemoveHandlers();

  autocompleteTags();
});

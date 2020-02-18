$(document).ready(function() {
  function attachRemoveHandlers(e) {
    $("#js-tags-fields").on("click", ".tag-field button.close", function(e) {
      e.preventDefault();
      $(this)
        .parent(".tag-field:first")
        .remove();
    });
  }

  $("#js-add-tag-field-button").click(function(e) {
    e.preventDefault();
    const newTag = $("#js-tag-template").html();
    $("#js-tags-fields").append(newTag);
  });
  attachRemoveHandlers();
});

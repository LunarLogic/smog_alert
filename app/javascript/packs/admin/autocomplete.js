import 'js-autocomplete/auto-complete.css';
import autocomplete from 'js-autocomplete';

const autocompleteTags = function() {
  const tags = JSON.parse(document.getElementById('js-tags-fields').dataset.tags)
  const tagInput = document.getElementById('1');

  if (tags && tagInput) {
    new autocomplete({
      selector: tagInput,
      minChars: 1,
      source: function(term, suggest){
          term = term.toLowerCase();
          const choices = tags;
          const matches = [];
          for (let i = 0; i < choices.length; i++)
              if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
          suggest(matches);
      },
    });
  }
  console.log(tags)
};

export { autocompleteTags };

export default function simulateSearchboxChange(wrapper, term) {
  wrapper.find("input").simulate("change");
  wrapper
    .find("Select")
    .props()
    .onInputChange(term);
  wrapper.update();
}

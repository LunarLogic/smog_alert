const add = (a, b) => {
  return a + b;
};

it("add", () => {
  expect(add(1, 2)).toBe(3);
});

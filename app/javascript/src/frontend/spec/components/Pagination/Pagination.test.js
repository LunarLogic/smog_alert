import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { MemoryRouter } from "react-router-dom";

import { Pagination } from "../../../components/Pagination/Pagination";

describe("<Pagination/>", () => {
  const redirectPath = "";
  const mockPagination = {
    per_page: 5,
    total_pages: 3,
    total_objects: 11,
    prev_page: 1,
    current_page: 2,
    next_page: 3,
    is_first_page: false,
    is_last_page: false,
    is_page_out_of_range: false
  };
  const mockPaginationWith1Page = {
    per_page: 5,
    total_pages: 1,
    total_objects: 5,
    prev_page: null,
    current_page: 1,
    next_page: null,
    is_first_page: true,
    is_last_page: true,
    is_page_out_of_range: false
  };
  it("Renders correct number of boxes for 3 pages (3 + 4 boxes with arrows)", () => {
    const wrapperWithLoader = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/aktualnosci"]}>
          <Pagination redirectPath={redirectPath} pagination={mockPagination} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapperWithLoader.find("LinkButton").length).toEqual(7);
  });
  it("Renders correct number of boxes for 3 pages (max of 3 + 1 boxes + 4 boxes with arrows)", () => {
    const mockPaginationWithMoreThan3Boxes = {
      ...mockPagination,
      total_pages: 5
    };
    const wrapperWithLoader = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/aktualnosci"]}>
          <Pagination
            redirectPath={redirectPath}
            pagination={mockPaginationWithMoreThan3Boxes}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapperWithLoader.find("LinkButton").length).toEqual(8);
  });
  it("Renders correct number of boxes for 1 page (1 + 4 boxes with arrows)", () => {
    const wrapperWithLoader = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/aktualnosci"]}>
          <Pagination
            redirectPath={redirectPath}
            pagination={mockPaginationWith1Page}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapperWithLoader.find("LinkButton").length).toEqual(5);
  });
  it("Adds disabled to all arrow boxes", () => {
    const wrapperWithLoader = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/aktualnosci"]}>
          <Pagination
            redirectPath={redirectPath}
            pagination={mockPaginationWith1Page}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(
      wrapperWithLoader
        .find('span[children="»"]')
        .parent()
        .props().disabled
    ).toEqual(true);
    expect(
      wrapperWithLoader
        .find('span[children="›"]')
        .parent()
        .props().disabled
    ).toEqual(true);
    expect(
      wrapperWithLoader
        .find('span[children="‹"]')
        .parent()
        .props().disabled
    ).toEqual(true);
    expect(
      wrapperWithLoader
        .find('span[children="«"]')
        .parent()
        .props().disabled
    ).toEqual(true);
  });
});

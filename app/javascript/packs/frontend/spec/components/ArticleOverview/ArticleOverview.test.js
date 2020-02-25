import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import { ArticleOverview } from "../../../components/ArticleOverview/ArticleOverview";

describe("ArticleOverview component", () => {
  it("renders data passed in props", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/random"]}>
        <ArticleOverview
          title="Lorem"
          image={"test.jpg"}
          overview="Ipsum"
          publishingDate="2020-02-14T12:06:43.869Z"
          updatingDate="2020-02-18T12:42:23.636Z"
          id={1}
          resetArticle={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(wrapper.find(".article-overview__title").text()).toEqual("Lorem");
    expect(wrapper.find(".article-overview__date-published").text()).toContain(
      "14 lutego 2020r."
    );
    expect(wrapper.find(".article-overview__date-updated").text()).toContain(
      "18 lutego 2020r."
    );
    expect(wrapper.find("StyledComponent").prop("image")).toEqual("test.jpg");
    expect(
      wrapper.find(".article-overview__container--overview-text").text()
    ).toEqual("Ipsum");
    expect(wrapper.find("Link").prop("to")).toContain("1");
  });
});

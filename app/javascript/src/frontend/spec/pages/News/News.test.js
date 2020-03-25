import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { MemoryRouter } from "react-router-dom";
import { News } from "../../../pages/News/News";
import articlesMock from "../../__mocks__/articlesMock.json";

describe("News page", () => {
  const match = {
    params: { id: 1 }
  };
  it("renders loader when no response from API is yet provided", () => {
    const wrapperWithLoader = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <News
            match={match}
            getArticles={jest.fn()}
            setArticlesPage={jest.fn()}
            articles={[]}
            setCurrentPath={jest.fn()}
            loader={true}
            error={false}
            pagination={{}}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapperWithLoader.exists("Loader")).toEqual(true);
  });

  it("renders correct error message when API call is resolved with error", () => {
    const wrapperWithError = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <News
            match={{ params: { id: 1 } }}
            getArticles={jest.fn()}
            setArticlesPage={jest.fn()}
            articles={[]}
            setCurrentPath={jest.fn()}
            loader={false}
            error={true}
            pagination={{}}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapperWithError.find("NoItemFound").prop("text")).toEqual(
      "Przepraszamy, wystąpił błąd. Prosimy spróbować później."
    );
    expect(
      wrapperWithError.find("NoItemFound").prop("image").type.displayName
    ).toEqual("ErrorOutlineIcon");
  });

  it("renders correct message, when there are no articles in the database", () => {
    const wrapperEmptyDB = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <News
            match={{ params: { id: 1 } }}
            getArticles={jest.fn()}
            setArticlesPage={jest.fn()}
            articles={[]}
            setCurrentPath={jest.fn()}
            loader={false}
            error={false}
            pagination={{}}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapperEmptyDB.find("NoItemFound").prop("text")).toEqual(
      "Brak artykułów do wyświetlenia"
    );
    expect(
      wrapperEmptyDB.find("NoItemFound").prop("image").type.displayName
    ).toEqual("ImportContactsIcon");
  });

  it("renders article overviews on the news page when API call is successfully resolved", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <News
            match={{ params: { id: 1 } }}
            getArticles={jest.fn()}
            setArticlesPage={jest.fn()}
            articles={articlesMock.data}
            setCurrentPath={jest.fn()}
            loader={false}
            error={false}
            pagination={{}}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("ArticleOverview").length).toEqual(2);
    const articleOverview = wrapper.find("ArticleOverview").at(0);
    expect(articleOverview.prop("title")).toEqual(
      "Consequatur quisquam reprehenderit sequi"
    );
    expect(articleOverview.prop("overview")).toContain(
      "Impedit consequuntur qui deleniti sed sit perferendis voluptas"
    );
    expect(articleOverview.prop("publishingDate")).toEqual(
      "2020-02-14T12:06:43.869Z"
    );
    expect(articleOverview.prop("id")).toEqual(14);
  });
});

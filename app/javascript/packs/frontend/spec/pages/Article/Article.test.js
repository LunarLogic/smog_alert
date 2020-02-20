import React from "react";
import { Article } from "../../../pages/Article/Article";
import { mount } from "enzyme";
import articleMock from "../../__mocks__/articleMock.json";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { MemoryRouter } from "react-router-dom";

describe("Article page", () => {
  it("renders loader when no response from API is yet provided", () => {
    const wrapperWithLoader = mount(
      <Article
        match={{ params: { id: 1 } }}
        getArticle={jest.fn()}
        article={{}}
        loader={true}
        error={false}
        setCurrentPath={jest.fn()}
        errorCode={null}
      />
    );
    expect(wrapperWithLoader.exists("Loader")).toEqual(true);
  });
  it("renders correct error message when API call is resolved with error other than 404", () => {
    const wrapperWithError = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <Article
            match={{ params: { id: 1 } }}
            getArticle={jest.fn()}
            article={{}}
            loader={false}
            error={true}
            setCurrentPath={jest.fn()}
            errorCode={500}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapperWithError.find("NoItemFound").prop("text")).toEqual(
      "Przepraszamy, wystąpił błąd. Prosimy spróbować później."
    );
  });
  it("renders correct error message when API call is resolved with error 404", () => {
    const wrapperWithError404 = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <Article
            match={{ params: { id: 1 } }}
            getArticle={jest.fn()}
            article={{}}
            loader={false}
            error={true}
            setCurrentPath={jest.fn()}
            errorCode={404}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapperWithError404.find("NoItemFound").prop("text")).toEqual(
      "Przepraszamy, wybrany artykuł nie istnieje"
    );
  });
  it("renders article when API call is successfully resolved", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <Article
            match={{ params: { id: 13 } }}
            getArticle={jest.fn()}
            article={articleMock.data[0]}
            loader={false}
            error={false}
            setCurrentPath={jest.fn()}
            errorCode={null}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(".article__heading").text()).toEqual(
      "Explicabo quidem tenetur deleniti."
    );
    expect(wrapper.find(".article__container--body").text()).toContain(
      "Voluptates nulla expedita iure quas facere rerum quos illo eum ipsam rerum magnam corporis"
    );
    expect(wrapper.find(".article__date-published").text()).toContain(
      "14 lutego 2020r."
    );
    expect(wrapper.find(".article__date-updated").text()).toContain(
      "14 lutego 2020r."
    );
  });
});

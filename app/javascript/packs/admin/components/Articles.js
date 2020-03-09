import React from "react"

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    const url = "/api/internal/articles"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ articles: response.data }))
      .catch(() => console.log("Didn't work"));
  }

  render() {
    const { articles } = this.state;
    const allArticles = articles.map((article, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={article.image}
            className="card-img-top"
            alt={`${article.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <a href='#'>Zobacz artykuł</a>
          </div>
        </div>
      </div>
    ));
    const noArticle = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          Nie ma żadnego artykułu
        </h4>
      </div>
    );

    return (
      <>
        <h2>Opublikowane atykuły</h2>
        <hr/>
        <div className="py-5">
          <main className="container">
            <div className="row">
              {articles.length > 0 ? allArticles : noArticle}
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Articles;

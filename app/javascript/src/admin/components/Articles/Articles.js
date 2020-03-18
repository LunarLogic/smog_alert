import React, {useState, useEffect} from "react";
import {getArticles} from './helpers';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    getArticles(setArticles);
  },[])

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

export default Articles;

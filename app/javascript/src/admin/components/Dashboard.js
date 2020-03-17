import React from "react"
import Articles from "./Articles"
import Measurements from "./Measurements"
import "./Dashboard.scss"
// import { PropTypes } from "prop-types";

class Dashboard extends React.Component {
  render () {
    return (
      <>
        <Header />
        <Measurements />
        <Articles />
      </>
    )
  }
}

function Header(props) {
  return (
    <div className="primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Witaj w panelu Administratora</h1>
          <p className="lead">
            Zarządzaj treściami dostępnymi na stronie
          </p>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import React from "react"
import ReactDOM from "react-dom";

class Installations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      installations: []
    };
  }

  componentDidMount() {
    const url = "/api/internal/locations/no_current_measurements"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ installations: response }))
      .catch(() => console.log("Didn't work"));
  }

  handleClick(installationId) {
    if (this.state.chosenInstallationId === installationId) {
      this.setState({chosenInstallationId: undefined})
      this.setState({ measurement: undefined })
    } else {
      const url = "/api/internal/measurements/last_available?location_id=" + installationId.toString()
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          this.setState({ measurement: response.data })
          this.setState({chosenInstallationId: installationId})
        })
        .catch(() => console.log("Didn't work"));
    }
  }

  render() {
    const installations = this.state.installations;
    const allInstallations = installations.map((installation) => (
      <div key={installation.id}>
        <div className="row">
          <Installation installation={installation} onClick = {(id) => this.handleClick(id)}/>
        </div>
        {this.state.chosenInstallationId === installation.id &&
          <LastMeasurement measurement={this.state.measurement}/>}
      </div>
    ));
    const noInstallations = (
      <div className="no-installations-dashboard">
        <p>
          Wszystkie lokalizacje mają aktualne pomiary
        </p>
      </div>
    );
    return(
      <div id="dashboard-installations-list">
        <h2>Czujniki bez aktualnego pomiaru</h2>
        <hr/>
        <main className="container">
          {installations.length > 0 ? allInstallations : noInstallations}
        </main>
      </div>
    );
  }
}

function Installation(props) {
  return(
    <>
      <div className="col-1">
        <p>{props.installation.id}</p>
      </div>
      <div className="col-4">
        <p>{props.installation.name}</p>
      </div>
      <div className="col-3">
        <p>{props.installation.street}</p>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-center">
        <button className="btn btn-link btn-sm" onClick={() => props.onClick(props.installation.id)}>Czas ostatniego pomiaru</button>
      </div>
    </>
  )
}

function LastMeasurement(props) {
  const response = () => {
    if (!props.measurement) {
      return (
        <>
        <div className="col-8"></div>
        <div className="col-4"><p>Brak pomiarów dla tego czujnika</p></div>
        </>
      )
    } else {
      const date = new Date(props.measurement.till_date_time)
      return (
        <>
        <div className="col-8"></div>
        <div className="col-4"><p>{date.toLocaleString()}</p></div>
        </>
      )
    }
  }
  return(
    <div className="last-measurement row">
      {response()}
    </div>)
}

export default Installations;

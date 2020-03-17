import React from "react"
import ReactDOM from "react-dom";

class Installations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      installations: []
    };
  }

  handleClick(index) {
    if (this.state.chosenInstallation === index) {
      this.setState({chosenInstallation: undefined})
    } else {
      this.setState({chosenInstallation: index})
    }
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

  render() {
    const installations = this.state.installations;
    const allInstallations = installations.map((installation) => (
      <div key={installation.id} className="row">
        <Installation installation={installation} />
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
      <div className="col-4">
        <p>{props.installation.street}</p>
      </div>
      <div className="col-3">
        <button>Ostatni pomiar</button>
      </div>
    </>
  )
}


export default Installations;

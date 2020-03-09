import React from "react"

class Measurements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: []
    };
  }

  componentDidMount() {
    const url = "/api/internal/measurements/current"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ measurements: response.data }))
      .catch(() => console.log("Didn't work"));
  }

  handleClick(measurements) {
    let alert_msg = ""
    const values = measurements.map ((measurement, index) => (
      alert_msg += `${measurement.name}: ${measurement.value}; `
    ))
    alert(alert_msg)
  }

  render() {
    const { measurements } = this.state;
    const allMeasurements = measurements.map((measurement, index) => (
      <div key={index} className="row">
        <div className="col-5">
          <p>{measurement.location_name}</p>
        </div>
        <div className="col-5">
          <p>{measurement.last_hour_measurement ? measurement.last_hour_measurement.from_date_time : "brak danych z ostatniej godziny"}</p>
        </div>
        <div className="col-2">
          <button className="btn btn-light btn-sm" onClick={() => this.handleClick(measurement.last_hour_measurement.values)}>Pokaż</button>
        </div>
      </div>
    ));
    const noMeasurement = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          Nie ma żadnych pomiarów.
        </h4>
      </div>
    );

    return (
      <>
        <h2>Zebrane pomiary z ostatniej godziny</h2>
        <hr/>
        <div className="py-5">
          <main className="container">
            {measurements.length > 0 ? allMeasurements : noMeasurement}
          </main>
        </div>
      </>
    );
  }
}

export default Measurements;

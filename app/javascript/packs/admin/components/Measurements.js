import React from "react"
import ReactDOM from "react-dom";

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

  handleClick(index) {
    if (this.state.chosenMeasurement === index) {
      this.setState({chosenMeasurement: undefined})
    } else {
      this.setState({chosenMeasurement: index})
    }
  }

  displayMeasurementValues(index) {
    return <MeasurementValues measurements={this.state.measurements[index].last_hour_measurement.values}/>
  }

  render() {
    const measurements = this.state.measurements;
    const allMeasurements = measurements.map((measurement, index) => (
      <>
        <Measurement measurement={measurement} index={index} onClick = {(i) => this.handleClick(i)} />
        {this.state.chosenMeasurement === index &&
            <MeasurementValues measurements={this.state.measurements[index].last_hour_measurement.values} index={index}/>}
      </>
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

function Measurement(props) {
  return (
    <div>
      <div key={props.measurement.display_name} className="row">
        <div className="col-5">
          <p>{props.measurement.location_name}</p>
        </div>
        <div className="col-5">
          <p>{props.measurement.last_hour_measurement ? props.measurement.last_hour_measurement.from_date_time : "brak danych z ostatniej godziny"}</p>
        </div>
        <div className="col-2">
          <button disabled={!props.measurement.last_hour_measurement} className="btn btn-light btn-sm" onClick={() => props.onClick(props.index)}>Pokaż</button>
        </div>
      </div>
    </div>
  );
}

function MeasurementValues(props) {
  return (
    props.measurements.map ((measurement, index) => (
      <p key={measurement.name + props.index.toString()}>{measurement.name}: {measurement.value}</p>
    ))
  )
}

export default Measurements;

import React from "react"
import { PropTypes } from "prop-types";

class HelloWorld extends React.Component {
  render () {
    return (
      <div>
       Greeting: Hello, World!
      </div>
    )
  }
}

// HelloWorld.propTypes = {
//   greeting: PropTypes.string
// }
export default HelloWorld

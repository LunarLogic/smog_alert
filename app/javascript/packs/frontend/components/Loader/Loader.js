import React from "react";
import { DisappearedLoading } from "react-loadingg";
import { grey } from "../../styles/_variables.scss";
import { PropTypes } from "prop-types";

const Loader = ({ className, loaderStyles }) => {
  return (
    <div className={className}>
      <DisappearedLoading color={grey} style={loaderStyles} />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  loaderStyles: PropTypes.object
};

export default Loader;

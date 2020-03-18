import React from "react";
import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectOrganizationDetails } from "../../redux/application/application.selectors";

const PageTitle = ({ title, organizationDetails }) => {
  const { name } = organizationDetails;
  const defaultTitle = name;
  return (
    <Helmet>
      <title>{title ? `${title} - ${name}` : defaultTitle}</title>
    </Helmet>
  );
};

const mapStateToProps = createStructuredSelector({
  organizationDetails: selectOrganizationDetails
});

PageTitle.propTypes = {
  title: PropTypes.string,
  organizationDetails: PropTypes.object
};

export default connect(mapStateToProps)(PageTitle);

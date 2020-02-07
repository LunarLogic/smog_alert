import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { popUpContent } from "./popUpContent";
import { setPopUpStatus } from "../../redux/homepage/homepage.actions";
import { selectPopUpStatus } from "../../redux/redux.selectors";

import "./PopUp.scss";

const PopUp = ({ popUpOpen, setPopUpStatus }) => {
  const togglePopUp = () => {
    setPopUpStatus(!popUpOpen);
  };
  return (
    <div className="popup">
      <div className="popup__heading">
        <div className="popup__heading--title">Co to znaczy?</div>
        <div className="popup__heading--exit" onClick={togglePopUp}>
          <HighlightOffIcon />
        </div>
      </div>
      {popUpContent.map(element => {
        return (
          <div className="popup__text" key={`popup${element.title}`}>
            <div className="popup__text--heading">{element.title}</div>
            <div className="popup__text--caption">{element.text}</div>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setPopUpStatus: popUpOpen => dispatch(setPopUpStatus(popUpOpen))
});

const mapStateToProps = createStructuredSelector({
  popUpOpen: selectPopUpStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);

import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Form, SuccessForm } from "../";

import { selectFormContent } from "../../redux/form/form.selectors";
import { setFormContent } from "../../redux/form/form.actions";
import { isEmpty } from "../../helpers";

import "./FormModal.scss";
import CloseIcon from "@material-ui/icons/Close";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.7)"
  },
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    width: "40rem",
    height: "auto",
    background: "white",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  }
};

Modal.setAppElement();

const FormModal = ({ isOpen, closeModal, formContent, setFormContent }) => {
  const handleCloseModal = () => {
    setFormContent({});
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Form Modal"
    >
      <div className="modal-header">
        <span onClick={handleCloseModal} className="modal-header-close">
          <CloseIcon />
        </span>
      </div>
      {isEmpty(formContent) ? (
        <Form closeModal={closeModal} />
      ) : (
        <SuccessForm formContent={formContent} />
      )}
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  setFormContent: content => dispatch(setFormContent(content))
});

const mapStateToProps = createStructuredSelector({
  formContent: selectFormContent
});

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);

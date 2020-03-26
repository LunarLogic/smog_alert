import React from "react";
import Modal from "react-modal";
import Form from "../Form/Form";

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

const FormModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Form Modal"
    >
      <div className="modal-header">
        <p className="modal-header-heading">Napisz do nas !</p>
        <span onClick={closeModal} className="modal-header-close">
          <CloseIcon />
        </span>
      </div>
      <Form closeModal={closeModal} />
    </Modal>
  );
};

export default FormModal;

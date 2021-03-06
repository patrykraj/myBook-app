import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import Button from "../formElements/Button";
import LoadingSpinner from "../UI/Loader/LoadingSpinner";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import classes from "./Modal.module.css";

const Modal = (props) => {
  let content = (
    <>
      {props.show && <Backdrop cancel={props.cancelModal} />}
      <div
        className={classes.Modal}
        style={{
          transform: props.show
            ? "translate(-50%, 0)"
            : "translate(-50%, -100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.loading ? (
          <LoadingSpinner padding />
        ) : (
          <>
            <div className={classes.ModalTop}>
              <span>Notification</span>
              <button
                onClick={props.cancelModal}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "2.5rem",
                  color: "#ea3c53",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
            <div className={classes.ModalBottom}>
              <p>{props.show}</p>
              {props.delete && (
                <>
                  <Button
                    click={() =>
                      props.onDeleteBook(props.deleteId, props.token)
                    }
                  >
                    Confirm
                  </Button>
                  <Button click={props.cancelModal}>Cancel</Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => {
  return {
    deleteId: state.books.deleteId,
    loading: state.books.loading,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteBook: (payload, token) =>
      dispatch(actions.deleteBook(payload, token)),
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Modal));

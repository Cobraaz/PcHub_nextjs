import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteItem, deleteData } from "helpers/helper.functions";

const Modale = ({ showModal, toggleModal, dispatch, state }) => {
  const { modal, auth } = state;
  const handleSubmit = async () => {
    if (modal.type === "GET_ALL_USERS") {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await deleteData(`user/delete_user/${modal.id}`, auth.token);
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      dispatch(deleteItem(modal.data, modal.id, modal.type));
    }
    dispatch(deleteItem(modal.data, modal.id, modal.type));
    dispatch({ type: "ADD_MODAL", payload: [] });
  };

  return (
    <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        {modal && modal.title && modal.title.split(" ").slice(0, 2).join(" ")}
      </ModalHeader>
      <ModalBody>Do you want to delete this item?</ModalBody>
      <ModalFooter>
        <button
          className="buttonModal btn-danger"
          onClick={() => {
            toggleModal();
            handleSubmit();
          }}
        >
          Yes
        </button>
        <button className="buttonModal btn-primary" onClick={toggleModal}>
          Cancel
        </button>
      </ModalFooter>

      <style jsx>{`
        .buttonModal {
          color: white;
          padding: 7px 20px;
          font-size: 1em;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          margin-top: 20px;
          outline: none !important;
        }
      `}</style>
    </Modal>
  );
};

export default Modale;

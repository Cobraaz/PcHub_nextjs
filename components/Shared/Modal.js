import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteItem } from "helpers/helper.functions";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const Modale = ({ modal, showModal, toggleModal, dispatch }) => {
  const handleSubmit = () => {
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

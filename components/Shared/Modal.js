import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteItem, deleteData } from "helpers/helper.functions";
import { useRouter } from "next/router";

const Modale = ({ showModal, toggleModal, dispatch, state }) => {
  const { modal, auth } = state;
  const router = useRouter();

  const deleteUser = async (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await deleteData(`user/delete_user/${item.id}`, auth.token);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    dispatch(deleteItem(item.data, item.id, item.type));
  };

  const deleteCategories = async (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await deleteData(`categories/${item.id}`, auth.token);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    dispatch(deleteItem(item.data, item.id, item.type));
  };

  const deleteProduct = async (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await deleteData(`product/get_by_id/${item.id}`, auth.token);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    return (window.location.href = "/");
  };

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === "ADD_CART") {
          dispatch(deleteItem(item.data, item.id, item.type));
        }

        if (item.type === "GET_ALL_USERS") deleteUser(item);

        if (item.type === "ADD_CATEGORIES") deleteCategories(item);

        if (item.type === "DELETE_PRODUCT") deleteProduct(item);

        dispatch({ type: "ADD_MODAL", payload: [] });
      }
    }
  };

  return (
    <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        {modal.length > 0 &&
          modal[0].title &&
          modal[0].title.split(" ").slice(0, 4).join(" ")}
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

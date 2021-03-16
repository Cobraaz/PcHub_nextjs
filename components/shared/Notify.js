import { useContext } from "react";
import { DataContext } from "store/GlobalState";
import Loading from "./Loading";
import { toast } from "react-toastify";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  const handleShow = () => dispatch({ type: "NOTIFY", payload: {} });

  const displayToast = (err) => {
    err;
    return;
  };
  return (
    <>
      {notify.loading && <Loading />}
      {notify.error &&
        displayToast(
          toast.error(notify.error, {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            onClose: handleShow,
            toastId: "custom-id-error",
          })
        )}
      {notify.success &&
        displayToast(
          toast.success(notify.success, {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            onClose: handleShow,
            toastId: "custom-id-success",
          })
        )}
    </>
  );
};

export default Notify;

import { useContext } from "react";
import { DataContext } from "store/GlobalState";
import Loading from "./Loading";
import { toast } from "react-toastify";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  const handleShow = () => dispatch({ type: "NOTIFY", payload: {} });
  return (
    <>
      {notify.loading && <Loading />}
      {notify.error &&
        toast.error(notify.error, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          onClose: handleShow,
        })}
      {notify.success && (
        <div onClick={() => dispatch({ type: "NOTIFY", payload: {} })}>
          {toast.success(notify.success, {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            onClose: handleShow,
          })}
        </div>
      )}
    </>
  );
};

export default Notify;

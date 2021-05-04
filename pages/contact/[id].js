import {
  useState,
  useContext,
  useEffect,
  useRouter,
  parseCookies,
} from "helpers/package.import";

import { BaseLayout, BasePage, Modal } from "helpers/components.import";

import { DataContext, getData, postData } from "helpers/helper.functions";

import ContactDetail from "components/contact/ContactDetail";

const ContactReview = () => {
  const router = useRouter();
  const { id } = router.query;

  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  const [customerResponse, setCustomerResponse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (auth.user && auth.user.role === "root") {
      getData(`contact/${id}`, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        setCustomerResponse(res.contact);
      });
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = customerResponse;
    const res = await postData(
      "contact/reply_customer",
      { name, email },
      auth.token
    );
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleDelete = async (e) => {
    if (auth.user.role === "root") {
      toggleModal();
      dispatch({
        type: "ADD_MODAL",
        payload: [
          {
            data: "",
            id: id,
            title: "User Review",
            type: "DELETE_CONTACT",
          },
        ],
      });
    }
  };

  if (!customerResponse)
    return (
      <BaseLayout>
        <BasePage
          className="signin-page wrapper"
          title={`PcHub Detail User Response`}
        ></BasePage>
      </BaseLayout>
    );
  return (
    <div>
      <BaseLayout>
        <BasePage
          className="wrapper"
          title={`PcHub Detail User Response`}
          header="User Response"
        >
          <Modal
            dispatch={dispatch}
            showModal={showModal}
            toggleModal={toggleModal}
            state={state}
          />
          <ContactDetail
            item={customerResponse}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        </BasePage>
      </BaseLayout>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // some auth logic here
  const { res } = ctx;
  const { user } = parseCookies(ctx);
  const isAuth = user ? JSON.parse(user) : false;

  if (
    !isAuth ||
    isAuth.role == "" ||
    isAuth.role == "user" ||
    !isAuth.role == "root"
  ) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ContactReview;

import {
  useState,
  useContext,
  useEffect,
  useRouter,
  parseCookies,
  React,
} from "helpers/package.import";

import { BaseLayout, BasePage, Modal } from "helpers/components.import";

import {
  DataContext,
  getData,
  postData,
  withAuth,
} from "helpers/helper.functions";

import ContactDetail from "components/contact/ContactDetail";
import { GetServerSideProps } from "next";

interface CustomerResponse {
  name: string;
  email: string;
  phone_no: string;
  message: string;
  avatar: string;
}

const ContactReview: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  const [customerResponse, setCustomerResponse] = useState<CustomerResponse>({
    name: "",
    email: "",
    phone_no: "",
    message: "",
    avatar: "",
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleDelete = async () => {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // some auth logic here
  const { res } = ctx;
  const { user } = parseCookies(ctx);
  const isAuth = user ? JSON.parse(user) : false;

  if (!isAuth || isAuth.role == "" || isAuth.role == "user") withAuth(res, "/");

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default ContactReview;

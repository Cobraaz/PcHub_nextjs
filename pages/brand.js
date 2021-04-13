import {
  useContext,
  useState,
  Row,
  Col,
  parseCookies,
} from "helpers/package.import";
import { BaseLayout, BasePage, Modal } from "helpers/components.import";

import {
  postData,
  DataContext,
  updateItem,
  putData,
  withAuth,
} from "helpers/helper.functions";

const Brand = () => {
  const [name, setName] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { brands, auth } = state;
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const createBrand = async () => {
    if (auth.user.role === "user")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not vaild." },
      });

    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Name can not be left blank." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`brand/${id}`, { name }, auth.token);

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch(updateItem(brands, id, res.brand, "ADD_BRANDS"));
    } else {
      res = await postData("brand", { name }, auth.token);

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "ADD_BRANDS",
        payload: [...brands, res.newBrand],
      });
    }
    setName("");
    setId("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditBrand = (brand) => {
    setId(brand._id);
    setName(brand.name);
  };

  const handleDelete = async (brand) => {
    try {
      if (auth.user.role !== "user") {
        toggleModal();
        dispatch({
          type: "ADD_MODAL",
          payload: [
            {
              data: brands,
              id: brand._id,
              title: brand.name,
              type: "ADD_BRANDS",
            },
          ],
        });
        setName("");
        setId("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onClick={() => showModal && toggleModal()}>
      <BaseLayout>
        <BasePage
          className="wrapper"
          header="Brands"
          title="PcHub Admin Brands Page"
        >
          <Modal
            dispatch={dispatch}
            showModal={showModal}
            toggleModal={toggleModal}
            state={state}
          />
          <Row>
            <Col
              md={{ size: 6, offset: 3 }}
              sm={{ size: 6, offset: 3 }}
              xs={{ size: 12 }}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a new Brand"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <button
                  className="btn btn-secondary ml-1"
                  onClick={createBrand}
                >
                  {id ? "Update" : "Create"}
                  Update
                </button>
              </div>

              {brands.map((brand) => (
                <div key={brand._id} className="card my-2 text-capitalize">
                  <div className="card-body d-flex justify-content-between">
                    {brand.name}

                    <div style={{ cursor: "pointer" }}>
                      <i
                        className="ri-pencil-fill mr-2 text-info"
                        onClick={() => handleEditBrand(brand)}
                      ></i>

                      <i
                        className="ri-delete-bin-line text-danger"
                        onClick={() => handleDelete(brand)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
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

  if (isAuth.role == "user" || isAuth.role == "" || !isAuth) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Brand;

import { useContext, useState, Row, Col } from "helpers/package.import";
import { BaseLayout, BasePage, Modal } from "helpers/components.import";

import {
  postData,
  DataContext,
  updateItem,
  putData,
} from "helpers/helper.functions";

const Categories = () => {
  const [name, setName] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const createCategory = async () => {
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
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCategory],
      });
    }
    setName("");
    setId("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditCategory = (catogory) => {
    setId(catogory._id);
    setName(catogory.name);
  };

  const handleDelete = async (catogory) => {
    try {
      if (auth.user.role !== "user") {
        toggleModal();
        dispatch({
          type: "ADD_MODAL",
          payload: {
            data: categories,
            id: catogory._id,
            title: catogory.name,
            type: "ADD_CATEGORIES",
          },
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
        <BasePage className="wrapper">
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
                  placeholder="Add a new category"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <button
                  className="btn btn-secondary ml-1"
                  onClick={createCategory}
                >
                  {id ? "Update" : "Create"}
                  Update
                </button>
              </div>

              {categories.map((catogory) => (
                <div key={catogory._id} className="card my-2 text-capitalize">
                  <div className="card-body d-flex justify-content-between">
                    {catogory.name}

                    <div style={{ cursor: "pointer" }}>
                      <i
                        className="ri-pencil-fill mr-2 text-info"
                        onClick={() => handleEditCategory(catogory)}
                      ></i>

                      <i
                        className="ri-delete-bin-line text-danger"
                        onClick={() => handleDelete(catogory)}
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

export default Categories;

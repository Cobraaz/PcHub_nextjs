import {
  useContext,
  useState,
  useRouter,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  parseCookies,
} from "helpers/package.import";
import { BaseLayout, BasePage } from "helpers/components.import";

import { DataContext, withAuth } from "helpers/helper.functions";
const ProductsManager = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;
  const initialState = {
    product_id: "",
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  };

  const [product, setProduct] = useState(initialState);
  const [onEdit, setOnEdit] = useState(false);
  const [images, setImages] = useState([]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const {
    product_id,
    title,
    price,
    inStock,
    description,
    content,
    category,
  } = product;

  console.log(images);

  return (
    <BaseLayout>
      <BasePage className="products_manager wrapper" header="Create Product">
        <form>
          <Row>
            <Col md={{ size: 6 }}>
              <Input
                type="text"
                name="text"
                value={product_id}
                placeholder="Products ID"
                className="d-block my-4 w-100 p-2"
                onChange={handleChangeInput}
              />
              <Input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                className="d-block my-4 w-100 p-2"
                onChange={handleChangeInput}
              />

              <Row>
                <Col sm={{ size: 6 }}>
                  <FormGroup>
                    <Label for="exampleEmail">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      value={price}
                      placeholder="Price"
                      className="d-block w-100 p-2"
                      onChange={handleChangeInput}
                    />
                  </FormGroup>
                </Col>

                <Col sm={{ size: 6 }}>
                  <FormGroup>
                    <Label for="exampleEmail">In Stock</Label>
                    <Input
                      type="number"
                      name="inStock"
                      value={inStock}
                      placeholder="inStock"
                      className="d-block w-100 p-2"
                      onChange={handleChangeInput}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Input
                type="textarea"
                name="description"
                id="description"
                cols="30"
                rows="4"
                placeholder="Description"
                onChange={handleChangeInput}
                className="d-block my-4 w-100 p-2"
                value={description}
              />

              <Input
                type="textarea"
                name="content"
                id="content"
                cols="30"
                rows="6"
                placeholder="Content"
                onChange={handleChangeInput}
                className="d-block my-4 w-100 p-2"
                value={content}
              />

              <div className="input-group-prepend px-0 my-2">
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={category}
                  onChange={handleChangeInput}
                  className="custom-select text-capitalize"
                >
                  <option value="all">All Products</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </div>

              <button type="submit" className="btn btn-info my-2 px-4">
                {onEdit ? "Update" : "Create"}
              </button>
            </Col>
            <Col md={{ size: 6 }} className="my-4">
              <InputGroup className="input-group">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Upload</InputGroupText>
                </InputGroupAddon>
                <div className="custom-file border rounded">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={handleUploadInput}
                    multiple
                    accept="image/*"
                  />
                </div>
              </InputGroup>
              <Row className="img-up mx-0">
                {images.map((img, index) => (
                  <div key={index} className="file_img my-1">
                    <img
                      src={img.url ? img.url : URL.createObjectURL(img)}
                      alt=""
                      className="img-thumbnail rounded"
                      style={{ cursor: "default" }}
                    />

                    <span onClick={() => deleteImage(index)}>X</span>
                  </div>
                ))}
              </Row>
            </Col>
          </Row>
        </form>
      </BasePage>
    </BaseLayout>
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

export default ProductsManager;

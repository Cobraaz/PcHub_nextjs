import {
  useState,
  useContext,
  useEffect,
  useRouter,
  Head,
  Link,
} from "helpers/package.import";
import { BaseLayout, BasePage, OrderDetail } from "helpers/components.import";
import { DataContext } from "helpers/helper.functions";

const DetailOrder = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;

  const router = useRouter();

  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);

  console.log(orderDetail);
  if (!auth.user) return null;
  return (
    <BaseLayout>
      <BasePage className="wrapper Order-detail-AB">
        <div>
          <button
            onClick={() => router.back()}
            className="go_back btn btn-dark"
            style={{
              verticalAlign: "middle",
            }}
          >
            <i className="ri-arrow-left-fill"></i>
            Go Back
          </button>
        </div>

        <OrderDetail
          orderDetail={orderDetail}
          state={state}
          dispatch={dispatch}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default DetailOrder;

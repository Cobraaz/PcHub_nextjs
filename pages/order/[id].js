import {
  useState,
  useContext,
  useEffect,
  useRouter,
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

  if (!auth.user) return null;
  return (
    <BaseLayout>
      <BasePage className="wrapper Order-detail-AB">
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

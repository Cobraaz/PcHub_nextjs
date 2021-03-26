import { useContext } from "helpers/package.import";
import { BaseLayout, BasePage } from "helpers/components.import";
import { DataContext } from "helpers/helper.functions";
const Checkout = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  if (cart.length === 0)
    return (
      <BaseLayout>
        <BasePage indexPage className="">
          <img
            className="img-responsive w-100"
            src="/empty-cart.jpg"
            alt="Empty cart"
          />
        </BasePage>
      </BaseLayout>
    );

  return (
    <BaseLayout>
      <BasePage className="signin-page wrapper">Checkout</BasePage>
    </BaseLayout>
  );
};

export default Checkout;

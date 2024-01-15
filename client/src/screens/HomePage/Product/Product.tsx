import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMediaQuery } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { pathActions } from "../../../store/path";
import { AuthContext } from "../../../hoc/store";
import { ProductDetails } from "./ProductDetails";
import { GoBack } from "../../../components/Navigation/GoBack";
import { CartIcon, GoBackIcon } from "../../../assets/svgs";
import { Path } from "../../../ts/types";

export function Product() {
  const dispatch = useDispatch();

  const prevProductPath = useSelector(
    (state: Path) => state.path.product.prevPath
  );

  const history = useHistory();

  const location = useLocation<string>();

  const { isMobile } = useMediaQuery();

  const { isAuthenticated } = useContext(AuthContext);

  const [itemsExistInCart, setItemsExistInCart] = useState(false);

  const showCartDotHandler = (isExist: boolean | undefined) => {
    if (isExist) setItemsExistInCart(isExist);
  };

  const loginPathHandler = () => {
    dispatch(
      pathActions.setLoginFullPath({
        prev: location.pathname,
        next: "/home/cart",
      })
    );
  };

  useEffect(() => {
    if (location.state) {
      dispatch(pathActions.setProductPrevPath(location.state));
    }
    window.scrollTo({
      top: 0,
    });
  }, [location, dispatch]);

  const goBackButton = (
    <GoBack backgroundColor="bg-gray-200">
      <div
        className="cursor-pointer"
        onClick={() => history.push(prevProductPath)}
      >
        <GoBackIcon />
      </div>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (!isAuthenticated()) {
            loginPathHandler();
          }
          history.push({
            pathname: "/home/cart",
            state: location.pathname,
          });
        }}
      >
        {itemsExistInCart && (
          <span className="absolute -top-2 -right-2 block w-2 h-2 rounded-full bg-red-400" />
        )}
        <CartIcon />
      </div>
    </GoBack>
  );

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-200 dark:bg-gray-800 pb-fixed-button md:p-5">
      {isMobile && goBackButton}
      <ProductDetails onShowCartDot={showCartDotHandler} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMediaQuery, useShowAlert } from "../../../hooks";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_ITEMS_FROM_CLIENT,
  GET_CURRENT_USER_CART,
  REGISTER_ORDER,
} from "../../../graphQL";
import { orderActions } from "../../../store/order";
import { Button, SuccessAlert } from "../../../components/UI";
import { cartActions } from "../../../store/cart";
import { GoBack } from "../../../components/Navigation/GoBack";
import { CartItems } from "./CartItems";
import { DeliveryLocations } from "./DeliveryLocations";
import { LocationModal } from "../Profile/Locations/LocationModal";
import { OrderInfo } from "./OrderInfo";
import { Checkout } from "./Checkout";
import { GoBackIcon } from "../../../assets/svgs";
import { CurrentUserCart, LocalCart } from "../../../ts/types";

export function Cart() {
  const dispatch = useDispatch();

  const { isMobile } = useMediaQuery();

  const history = useHistory();

  const cartItems = useSelector((state: LocalCart) => state.cart);

  const [disableButton, setDisableButton] = useState<boolean | undefined>(true);

  const [showLocationModal, setShowLocationModal] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  const [
    getCurrentCart,
    { loading: currentUserCartLoading, data: currentUserCartData },
  ] = useLazyQuery<CurrentUserCart>(GET_CURRENT_USER_CART);

  const [addItemsFromClient] = useMutation(ADD_ITEMS_FROM_CLIENT, {
    refetchQueries: [{ query: GET_CURRENT_USER_CART }],
    onCompleted() {
      resetCartHandler();
    },
  });

  const [registerOrder, { loading: registerOrderLoading }] = useMutation(
    REGISTER_ORDER,
    {
      refetchQueries: [{ query: GET_CURRENT_USER_CART }],
      update(cache, { data: { registerOrder: newOrder } }) {
        cache.modify({
          id: `User:${
            currentUserCartData && currentUserCartData.currentUser.id
          }`,
          fields: {
            orders(currentOrders = []) {
              const newOrderRef = cache.writeFragment({
                data: newOrder,
                fragment: gql`
                  fragment NewOrder on Order {
                    id
                    orderItems {
                      product {
                        id
                        title
                        price
                      }
                    }
                  }
                `,
              });
              return [...currentOrders, newOrderRef];
            },
          },
        });
      },
      onCompleted(data) {
        dispatch(orderActions.setOrder(data.registerOrder));
        setOrderRegisteredHandler();
        setTimeout(() => {
          setShowCheckout(true);
        }, 1500);
      },
    }
  );

  const { showAlert: showOrderAlert, showAlertHandler: showOrderAlertHandler } =
    useShowAlert({
      showTime: 1500,
    });

  const {
    showAlert: showLocationAlert,
    showAlertHandler: showLocationAlertHandler,
  } = useShowAlert({
    showTime: 1500,
  });

  const setOrderLocationHandler = (locationId: string) => {
    setSelectedLocationId(locationId);
  };

  const disableCheckoutButtonHandler = (isLocationEmpty: boolean) => {
    const isCartEmpty =
      currentUserCartData &&
      currentUserCartData.currentUser.cart.items.length === 0;
    setDisableButton(isCartEmpty || isLocationEmpty);
  };

  const closeLocationModal = () => {
    setShowLocationModal(false);
  };

  const openLocationModal = () => {
    setShowLocationModal(true);
  };

  const addLocationHandler = () => {
    showLocationAlertHandler();
  };

  const resetCartHandler = () => {
    dispatch(cartActions.resetCart());
  };

  const setOrderRegisteredHandler = () => {
    showOrderAlertHandler();
  };

  const hideCheckout = () => {
    setShowCheckout(false);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      addItemsFromClient({ variables: { cartItems: cartItems } });
    } else {
      getCurrentCart();
    }
  }, [addItemsFromClient, getCurrentCart, cartItems]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [history.location.pathname]);

  return (
    <>
      <SuccessAlert
        alertMessage={"Your Order Register Successfully"}
        showAlert={showOrderAlert}
      />
      <SuccessAlert
        alertMessage="Location Added"
        showAlert={showLocationAlert}
      />
      {showLocationModal && (
        <LocationModal
          showModal={showLocationModal}
          onClose={closeLocationModal}
          onAdd={addLocationHandler}
        />
      )}
      {showCheckout && (
        <Checkout showCheckout={showCheckout} onHideCheckout={hideCheckout} />
      )}
      <div className="flex flex-col md:flex-row md:items-start w-full min-h-screen bg-gray-200 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-700 pb-fixed-button md:p-3 md:space-x-3">
        {isMobile && (
          <GoBack backgroundColor="bg-gray-200">
            <div className="cursor-pointer" onClick={() => history.goBack()}>
              <GoBackIcon />
            </div>
          </GoBack>
        )}
        <CartItems
          cart={
            currentUserCartData && currentUserCartData.currentUser.cart.items
          }
          loading={currentUserCartLoading}
        />
        <div className="flex flex-col w-full md:w-150 md:bg-gray-200 md:dark:bg-gray-800 md:rounded-xl p-3">
          <DeliveryLocations
            onSetOrderLocation={setOrderLocationHandler}
            onSetDisableButton={disableCheckoutButtonHandler}
            openLocationModal={openLocationModal}
          />
          <OrderInfo
            totalPrice={
              currentUserCartData &&
              currentUserCartData.currentUser.cart.totalPrice
            }
            totalItems={
              currentUserCartData &&
              currentUserCartData.currentUser.cart.totalItems
            }
          />
          <Button
            onClick={() => {
              registerOrder({
                variables: { selectedLocationId: selectedLocationId },
              });
            }}
            color="btn-green"
            disabled={
              disableButton || registerOrderLoading || currentUserCartLoading
            }
          >
            {registerOrderLoading ? (
              <div className="w-6 h-6 animate-spin spinner-loader" />
            ) : (
              <span
                className={`${
                  disableButton
                    ? "text-opacity-90 text-white dark:text-gray-400"
                    : ""
                }`}
              >
                Checkout
              </span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

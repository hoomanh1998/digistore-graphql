import { CurrentUserCart, ProductCardPropTypes, Size } from "../../ts/types";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { AuthContext } from "../../hoc/store";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_ITEM_TO_CART, GET_CURRENT_USER_CART } from "../../graphQL";
import { MediumProductCard } from "./MediumProductCard";
import { WideProductCard } from "./WideProductCard";
import { useShowAlert } from "../../hooks";
import { SuccessAlert } from "../UI";

export function ProductCard({
  id,
  title,
  price,
  category,
  reference,
  routeState,
  size,
  fixedWidth,
}: ProductCardPropTypes) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useContext(AuthContext);

  const { data: userCartData } = useQuery<CurrentUserCart>(
    GET_CURRENT_USER_CART
  );

  const { showAlert, showAlertHandler } = useShowAlert({ showTime: 1500 });

  const [addItemToCart, { loading: addItemToCartLoading }] = useMutation(
    ADD_ITEM_TO_CART,
    {
      update(cache, { data: { addItemToCart } }) {
        cache.modify({
          id: `User:${userCartData && userCartData.currentUser.id}`,
          fields: {
            cart(currentCartRef) {
              cache.modify({
                id: currentCartRef.__ref,
                fields: {
                  items: (existingCartItems) => {
                    const newCartItemRef = cache.writeFragment({
                      data: addItemToCart,
                      fragment: gql`
                        fragment NewCartItem on CartItem {
                          id
                          product
                          quantity
                        }
                      `,
                    });
                    return [...existingCartItems, newCartItemRef];
                  },
                },
              });
            },
          },
        });
      },
      onCompleted() {
        showAlertHandler();
      },
    }
  );

  const addToCartHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (isAuthenticated()) {
      addItemToCart({
        variables: { product_id: id },
      });
    } else {
      dispatch(
        cartActions.addItemToCart({
          productId: id!,
        })
      );
      showAlertHandler();
    }
  };

  const routePath = routeState
    ? {
        pathname: `/home/products/${id}`,
        state: routeState ? routeState : null,
      }
    : `/home/products/${id}`;

  const productCard =
    size === Size.Medium ? (
      <MediumProductCard
        title={title}
        price={price}
        path={routePath}
        reference={reference}
        addToCart={addToCartHandler}
        addToCartLoading={addItemToCartLoading}
        fixedWidth={fixedWidth}
      />
    ) : (
      <WideProductCard
        title={title}
        price={price}
        category={category}
        path={routePath}
        reference={reference}
        addToCart={addToCartHandler}
        addToCartLoading={addItemToCartLoading}
      />
    );

  return (
    <>
      <SuccessAlert
        alertMessage="Product added to cart"
        showAlert={showAlert}
      />
      {productCard}
    </>
  );
}

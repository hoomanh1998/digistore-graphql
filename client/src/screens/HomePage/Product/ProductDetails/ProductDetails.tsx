import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery, useShowAlert } from "../../../../hooks";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { pathActions } from "../../../../store/path";
import { cartActions } from "../../../../store/cart";
import {
  ADD_ITEM_TO_CART,
  ADD_TO_WISH_LIST,
  GET_CURRENT_USER_CART,
  GET_CURRENT_USER_WISH_LIST,
  GET_CURRENT_USER_WISH_LIST_IDS,
  GET_PRODUCT,
  GET_RELATED_PRODUCTS,
  REMOVE_FROM_WISH_LIST,
} from "../../../../graphQL";
import { AuthContext } from "../../../../hoc/store";
import { images } from "../../../../components/ImageSlider/images";
import { ImageSlider } from "../../../../components/ImageSlider";
import { ProductDescription } from "./ProductDescription";
import { ProductSpecification } from "./ProductSpecification";
import { ProductNotFound } from "../ProductNotFound";
import {
  CurrentUserCart,
  CurrentUserWishList,
  LocalCart,
  ProductData,
  ReactRouterParam,
  RelatedProductsData,
} from "../../../../ts/types";
import {
  ProductLoader,
  SliderLoader,
} from "../../../../components/SkeletonLoaders";
import { Slider } from "../../../../components/Slider";
import { Button, SuccessAlert } from "../../../../components/UI";
import { CartIcon, HeartColoredIcon } from "../../../../assets/svgs";

interface PropTypes {
  onShowCartDot: (flag: boolean | undefined) => void;
}

export function ProductDetails({ onShowCartDot }: PropTypes) {
  const dispatch = useDispatch();

  const history = useHistory<string>();

  const { pathname } = useLocation();

  const cartItems = useSelector((state: LocalCart) => state.cart);

  const { isMobile } = useMediaQuery();

  const { isAuthenticated } = useContext(AuthContext);

  const { id: productId } = useParams<ReactRouterParam>();

  const [itemIsAddedToWishList, setItemIsAddedToWishList] = useState(false);

  //get product details (ok)
  const {
    loading: productLoading,
    data: productData,
    error: productError,
  } = useQuery<ProductData>(GET_PRODUCT, {
    variables: { product_id: productId },
  });

  //get related products (ok)
  const { loading: relatedProductsLoading, data: relatedProductsData } =
    useQuery<RelatedProductsData>(GET_RELATED_PRODUCTS, {
      variables: { product_id: productId },
    });

  const { data: userCartData } = useQuery<CurrentUserCart>(
    GET_CURRENT_USER_CART
  );

  const { data: userWishListData } = useQuery<CurrentUserWishList>(
    GET_CURRENT_USER_WISH_LIST_IDS
  );

  //add update fuction:
  const [addToWishList] = useMutation(ADD_TO_WISH_LIST, {
    refetchQueries: [{ query: GET_CURRENT_USER_WISH_LIST }],
  });

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
                  items: (existingCartItems = []) => {
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
        showAddToCartAlertHandler();
      },
    }
  );

  const [removeFromWishList] = useMutation(REMOVE_FROM_WISH_LIST, {
    update(cache, { data: { removeFromWishList } }) {
      cache.modify({
        id: `User:${userWishListData && userWishListData.currentUser.id}`,
        fields: {
          wishList(wishListRef) {
            cache.modify({
              id: wishListRef.__ref,
              fields: {
                items: (existingItems) => {
                  return existingItems.filter(
                    (product: any) =>
                      product.__ref !== `Product:${removeFromWishList.id}`
                  );
                },
              },
            });
          },
        },
      });
    },
  });

  const {
    showAlert: showAddToCartAlert,
    showAlertHandler: showAddToCartAlertHandler,
  } = useShowAlert({
    showTime: 1500,
  });

  const {
    showAlert: showAddToWishListAlert,
    showAlertHandler: showAddToWishListAlertHandler,
    hideAlertHandler: hideAddToWishListAlertHandler,
  } = useShowAlert({
    showTime: 1500,
  });

  const wishListHandler = () => {
    if (itemIsAddedToWishList) {
      removeFromWishList({
        variables: {
          product_id: productId,
        },
      });
      hideAddToWishListAlertHandler();
      setItemIsAddedToWishList(false);
    } else {
      addToWishList({
        variables: {
          product_id: productId,
        },
      });
      showAddToWishListAlertHandler();
      setItemIsAddedToWishList(true);
    }
  };

  //move this to state management like wishlist-context
  const userWishListHandler = useCallback(() => {
    if (isAuthenticated()) {
      const wishListProductIds =
        userWishListData &&
        userWishListData.currentUser.wishList.items.map(({ id }) => id);

      const productIsExist =
        wishListProductIds && wishListProductIds.includes(productId);

      productIsExist && setItemIsAddedToWishList(true);
    }
  }, [productId, userWishListData, isAuthenticated]);

  const loginPathHandler = () => {
    dispatch(
      pathActions.setLoginFullPath({
        prev: pathname,
        next: pathname,
      })
    );
  };

  const addToCartHandler = () => {
    if (isAuthenticated()) {
      addItemToCart({
        variables: { product_id: productData && productData.product.id },
      });
    } else {
      dispatch(
        cartActions.addItemToCart({
          productId: productData && productData.product.id,
        })
      );
      showAddToCartAlertHandler();
    }
  };

  useEffect(() => {
    isAuthenticated()
      ? onShowCartDot(
          userCartData && userCartData.currentUser.cart.items.length > 0
        )
      : onShowCartDot(cartItems.length > 0);
  }, [isAuthenticated, userCartData, cartItems.length, onShowCartDot]);

  useEffect(() => {
    userWishListHandler();
    return () => {
      setItemIsAddedToWishList(false);
    };
  }, [userWishListHandler]);

  const productDetails = (
    <div className="flex flex-col lg:flex-row lg:max-w-7xl lg:items-center">
      {isMobile ? (
        <div className="flex flex-col w-full items-center px-3">
          <div className="relative w-full flex flex-col items-baseline mb-3">
            <span className="w-full text-gray-800 text-2xl font-bold dark:text-white mx-1">
              {productData && productData.product.title}
            </span>
            <div className="w-full text-gray-500 font-semibold mb-1 mx-1">
              {productData && productData.product.category.name}
            </div>
            <div className="w-full dark:text-white text-xl font-semibold mb-1 mx-1">
              {productData && productData.product.price}$
            </div>
            <div
              onClick={() => {
                if (isAuthenticated()) {
                  return wishListHandler();
                }
                loginPathHandler();
                history.push({
                  pathname: "/login",
                  state: pathname,
                });
              }}
              className="absolute right-1 bottom-0"
            >
              <HeartColoredIcon isActive={itemIsAddedToWishList} />
            </div>
          </div>
          <ImageSlider slides={images} />
        </div>
      ) : (
        <div className="flex flex-col relative mb-3 lg:sticky lg:top-3 lg:mr-4">
          <div className="flex flex-row flex-wrap items-start justify-between mb-4">
            <div className="flex flex-col">
              <span className="w-full text-gray-800 text-3xl font-bold dark:text-white mx-1">
                {productData && productData.product.title}
              </span>
              <div className="w-full text-gray-500 font-semibold mb-1 mx-1">
                {productData && productData.product.category.name}
              </div>
              <div className="w-full dark:text-white text-xl font-semibold mb-1 mx-1">
                {productData && productData.product.price}$
              </div>
            </div>
          </div>
          <ImageSlider slides={images} />
        </div>
      )}
      <div className="flex flex-col flex-1 w-full p-2.5 md:p-0">
        <ProductDescription
          description={productData && productData.product.description}
        />
        <ProductSpecification
          categoryName={productData && productData.product.category.name}
          brandName={productData && productData.product.brand.name}
        />
        <div className="flex flex-row md:space-x-3">
          <Button
            onClick={addToCartHandler}
            color="btn-green"
            disabled={addItemToCartLoading || showAddToCartAlert}
            positionFixed={isMobile}
          >
            {addItemToCartLoading ? (
              <div className="w-6 h-6 animate-spin spinner-loader" />
            ) : (
              <div className="flex flex-row w-full justify-center">
                <span
                  className={`mr-3 ${
                    addItemToCartLoading || showAddToCartAlert
                      ? "text-opacity-80 text-white dark:text-gray-400"
                      : null
                  }`}
                >
                  Add To Cart
                </span>
                <CartIcon
                  strokeColor={`${
                    addItemToCartLoading || showAddToCartAlert
                      ? "stroke-light-gray dark:stroke-dark-gray"
                      : "stroke-white"
                  }`}
                  smallIcon
                />
              </div>
            )}
          </Button>
          {!isMobile && (
            <button
              className={`btn border-2 border-red-400 dark:border-white p-3 ${
                itemIsAddedToWishList
                  ? "bg-red-400 dark:border-red-400"
                  : "bg-transparent"
              }`}
              onClick={() => {
                if (isAuthenticated()) {
                  return wishListHandler();
                }
                loginPathHandler();
                history.push({
                  pathname: "/login",
                  state: pathname,
                });
              }}
            >
              <HeartColoredIcon isActive={itemIsAddedToWishList} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const relatedProducts = relatedProductsLoading ? (
    <SliderLoader />
  ) : (
    <Slider
      title="Related Products"
      items={relatedProductsData && relatedProductsData.relatedProducts}
    />
  );

  if (productLoading) {
    return <ProductLoader />;
  }

  if (productError) {
    return <ProductNotFound />;
  }

  return (
    <>
      <SuccessAlert
        alertMessage="Added to Cart"
        showAlert={showAddToCartAlert}
      />
      <SuccessAlert
        alertMessage="Added to wishlist"
        showAlert={showAddToWishListAlert}
      />
      {productDetails}
      {!productError && relatedProducts}
    </>
  );
}

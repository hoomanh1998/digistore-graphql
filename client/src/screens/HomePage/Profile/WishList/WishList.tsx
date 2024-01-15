import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useShowAlert } from "../../../../hooks";
import { GET_CURRENT_USER_WISH_LIST } from "../../../../graphQL";
import { CurrentUserWishList } from "../../../../ts/types";
import { SuccessAlert } from "../../../../components/UI";
import { WishListLoader } from "../../../../components/SkeletonLoaders/WishListLoader";
import { WishListItems } from "./WishListItems";

export function WishList() {
  const divRef = useRef<HTMLDivElement>(null);
  const { showAlert, showAlertHandler } = useShowAlert({
    showTime: 1500,
  });

  const { loading, error, data } = useQuery<CurrentUserWishList>(
    GET_CURRENT_USER_WISH_LIST
  );

  const removeWishListItemHandler = () => {
    showAlertHandler();
  };

  if (error) {
    console.log(error.message);
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <SuccessAlert
        alertMessage="Product removed from wishlist"
        showAlert={showAlert}
      />
      <div
        ref={divRef}
        className="bg-gray-200 dark:bg-gray-800 flex flex-1 flex-col w-full h-full md:rounded-xl p-3 pb-navbar-height select-none"
      >
        <h3 className="text-2xl md:text-xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-700 px-1.5 pb-3 mb-3">
          Wish List
        </h3>
        {loading ? (
          <WishListLoader />
        ) : (
          <WishListItems
            wishListItems={data && data.currentUser.wishList.items}
            removeWishListItem={removeWishListItemHandler}
          />
        )}
      </div>
    </>
  );
}

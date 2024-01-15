import { Link, useHistory } from "react-router-dom";
import { ButtonTypes, Product } from "../../../ts/types";
import { Button } from "../../UI";
import { ApolloError } from "@apollo/client";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui";

interface PropTypes {
  productsResult: Product[] | undefined;
  loading: boolean | undefined;
  error: ApolloError | undefined;
  searchQuery?: string;
}

export const SearchResult = ({
  productsResult,
  loading,
  error,
  searchQuery,
}: PropTypes) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const closeSideBarHandler = () => {
    dispatch(uiActions.closeSideBar());
  };

  const searchResult = loading ? (
    <div className="flex justify-center w-full py-3">
      <div className="w-7 h-7 animate-spin spinner-loader-dark dark:spinner-loader m-3" />
    </div>
  ) : productsResult && productsResult.length > 5 ? (
    <div className="w-full flex flex-col items-start space-y-2">
      {productsResult.slice(0, 5).map(({ id, title }) => (
        <Link
          key={id}
          onClick={() => {
            closeSideBarHandler();
            dispatch(uiActions.setIsSearching(false));
          }}
          className="flex flex-1 flex-col h-full"
          to={`/home/products/${id}`}
        >
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer shadow-md">
            <span className="text-black dark:text-white font-semibold px-3 py-1.5">
              {title}
            </span>
          </div>
        </Link>
      ))}
      <Button
        onClick={() => {
          history.replace({ pathname: "/home/products", state: searchQuery });
        }}
        type={ButtonTypes.Submit}
        color="btn-blue"
        narrow
      >
        show more
      </Button>
    </div>
  ) : (
    <div className="flex flex-col space-y-2">
      {productsResult &&
        productsResult.map(({ id, title, price }) => (
          <Link
            key={id}
            onClick={() => {
              closeSideBarHandler();
              dispatch(uiActions.setIsSearching(false));
            }}
            className="flex flex-1 flex-col h-full"
            to={`/home/products/${id}`}
          >
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer shadow-md">
              <span className="text-black dark:text-white font-semibold px-3 py-1.5">
                {title}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );

  return (
    <div className="animate-appear fixed left-64 top-16 bg-gray-300 dark:bg-gray-700 rounded-xl shadow-lg w-full overflow-y-hidden ml-3 p-3 z-50">
      <p className="text-lg items-center font-semibold dark:text-white mb-2">
        Search results:
      </p>
      {error ? (
        <p className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl px-3 py-1.5">
          No matches found!
        </p>
      ) : (
        searchResult
      )}
    </div>
  );
};

import { useDispatch } from "react-redux";
import { GridViewIcon, ListViewIcon } from "../../../../assets/svgs";
import { View } from "../../../../ts/types";
import { uiActions } from "../../../../store/ui";

interface PropTypes {
  productView: View;
}

export function ProductsListView({ productView }: PropTypes) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row md:flex-col justify-start items-center md:items-start space-x-3 md:space-x-0 md:space-y-3 p-3 md:p-0 my-2 md:mt-0 md:mb-4">
      <h4 className="text-black dark:text-white text-lg md:text-xl font-bold">
        Views
      </h4>
      <div className="flex flex-row space-x-2">
        <div
          onClick={() => dispatch(uiActions.changeProductListView(View.Grid))}
          className={`btn flex justify-center items-center bg-white dark:bg-gray-600 border  border-gray-300 dark:border-gray-600 md:cursor-pointer p-3 md:p-2 ${
            productView === View.Grid
              ? "bg-gray-300 dark:bg-gray-800 shadow-inner"
              : ""
          }`}
        >
          <GridViewIcon />
        </div>
        <div
          onClick={() => dispatch(uiActions.changeProductListView(View.List))}
          className={`btn flex justify-center items-center bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 md:cursor-pointer p-3 md:p-2 ${
            productView === View.List
              ? "bg-gray-300 dark:bg-gray-800 shadow-inner"
              : ""
          }`}
        >
          <ListViewIcon />
        </div>
      </div>
    </div>
  );
}

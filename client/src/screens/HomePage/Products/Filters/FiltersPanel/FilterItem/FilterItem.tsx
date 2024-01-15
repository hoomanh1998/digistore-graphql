import { useHistory } from "react-router-dom";
import { FilterItemPropTypes } from "../../../../../../ts/types";
import { CheckBox } from "../../../../../../components/UI";

export const FilterItem = ({
  id,
  name,
  active,
  setActive,
}: FilterItemPropTypes) => {
  const history = useHistory();
  return (
    <div className="flex flex-row break-words items-center dark:text-white pb-3 mb-3 last:mb-0 last:pb-0 last:border-0">
      <CheckBox
        id={parseInt(id)}
        checked={active}
        onChange={() => {
          history.push({ search: `?filterId=${id}` });
          setActive(id);
        }}
      />
      <span className="ml-3 leading-tight">{name}</span>
    </div>
  );
};

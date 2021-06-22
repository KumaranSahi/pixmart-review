import classes from "./BestDeals.module.css";
import { Link } from "react-router-dom";
import { useProducts } from "../../../store";

export const BestDeals = () => {
  const { dispatch } = useProducts();

  return (
    <div
      className={classes["best-deals-container"]}
      onClick={() => dispatch({ type: "FILTER_BY_HAS_DISCOUNT" })}
    >
      <Link to="/product">
        <div className={classes["best-deals"]}>
          <h1>Amazing Deals!</h1>
        </div>
      </Link>
    </div>
  );
};
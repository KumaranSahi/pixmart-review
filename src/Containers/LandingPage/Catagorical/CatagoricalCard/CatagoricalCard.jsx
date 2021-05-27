import classes from "./CatagoricalCard.module.css";
import { useProducts } from "../../../../Store";
import { Link } from "react-router-dom";

export const CatagoricalCard = ({ children, type, image }) => {
  const { dispatch } = useProducts();

  return (
    <Link to="/product" onClick={() => dispatch({ type: type })}>
      <div
        className={classes["catagory-card"]}
        style={{ backgroundImage: `url("${image}")` }}
      >
        <span>{children}</span>
      </div>
    </Link>
  );
};
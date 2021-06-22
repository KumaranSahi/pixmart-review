import classes from "./CatagoricalCard.module.css";
import { useProducts } from "../../../../store";
import { Link } from "react-router-dom";

export const CatagoricalCard = ({ children, type, image }) => {
  const { productDispatch } = useProducts();

  return (
    <Link to="/product" onClick={() => productDispatch({ type: type })}>
      <div
        className={classes["catagory-card"]}
        style={{ backgroundImage: `url("${image}")` }}
      >
        <span>{children}</span>
      </div>
    </Link>
  );
};

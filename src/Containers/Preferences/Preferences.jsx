import classes from "./Preferences.module.css";
import {
  Radio,
  FormControlLabel,
  FormControl,
  Checkbox,
  RadioGroup,
} from "@material-ui/core";
import { useProducts } from "../../store";

export const Preferences = () => {
  const {
    hasDiscount,
    fastDelivery,
    includeOutOfStock,
    pixmartChoice,
    sortby,
    productDispatch,
    filterByCatagory,
  } = useProducts();
  return (
    <>
      <button
        className={`${classes["button-solid"]} ${classes["button-primary"]}`}
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </button>
      <FormControl component="fieldset">
        <h2 className={classes["field-title"]}>Sort by price:</h2>
        <RadioGroup
          aria-label="sort by cost"
          name="sortbycost"
          value={sortby}
          onChange={(event) =>
            productDispatch({
              type: event.target.value,
            })
          }
        >
          <FormControlLabel
            value="SORT_LOW_TO_HIGH"
            control={<Radio color="primary" />}
            label="Low to high"
          />
          <FormControlLabel
            value="SORT_HIGH_TO_LOW"
            control={<Radio color="primary" />}
            label="High to low"
          />
        </RadioGroup>
      </FormControl>
      <h2 className={classes["field-title"]}>Preferences:</h2>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              checked={fastDelivery}
              onChange={() =>
                productDispatch({
                  type: "FILTER_BY_FAST_DELIVERY",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="Fast delivery only"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeOutOfStock}
              onChange={() =>
                productDispatch({
                  type: "FILTER_BY_IN_STOCK",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="Inclue out of stock"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={pixmartChoice}
              onChange={() =>
                productDispatch({
                  type: "FILTER_BY_PIXMART_CHOICE",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="Pixmart Choice"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasDiscount}
              onChange={() =>
                productDispatch({
                  type: "FILTER_BY_HAS_DISCOUNT",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="With Discounts"
        />
      </FormControl>
      <h2 className={classes["field-title"]}>Catagories:</h2>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByCatagory === "FILTER_ONLY_DSLR"}
              onChange={() =>
                productDispatch({
                  type: "FILTER_ONLY_DSLR",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="DSLR"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByCatagory === "FILTER_ONLY_MIRRORLESS"}
              onChange={() =>
                productDispatch({
                  type: "FILTER_ONLY_MIRRORLESS",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="Mirrorless"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByCatagory === "FILTER_ONLY_POINT_AND_SHOOT"}
              onChange={() =>
                productDispatch({
                  type: "FILTER_ONLY_POINT_AND_SHOOT",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="Point and shoot"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByCatagory === "FILTER_ONLY_ACCESSORIES"}
              onChange={() =>
                productDispatch({
                  type: "FILTER_ONLY_ACCESSORIES",
                })
              }
              name="checkedB"
              color="primary"
            />
          }
          label="Accessories"
        />
      </FormControl>
    </>
  );
};
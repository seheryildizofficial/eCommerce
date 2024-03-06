import { ActionTypes } from "./../actionTypes";
import axios from "axios";

export const setLoading = () => ({
  type: ActionTypes.SET_LOADING,
});

export const setError = (payload) => ({
  type: ActionTypes.SET_ERROR,
  payload,
});

export const setProducts = (payload) => ({
  type: ActionTypes.SET_PRODUCTS,
  payload,
});

export const getProducts = () => (dispatch) => {
  dispatch(setLoading());

  axios
    .get("http://localhost:3054/products")
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => dispatch(setError(err)));
};

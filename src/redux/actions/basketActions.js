import axios from "axios";
import { ActionTypes } from "../actionTypes";

//asenkron thunk aksiyonu
//verileri sepet verilerini çekip aşama aşama reducer'a bildirir
export const getBasket = () => (dispatch) => {
  //reducer a verilerinin yüklendiğini haber verdik
  dispatch({ type: ActionTypes.SET_BASKET_LOADING });
  //verileri çek
  axios
    .get("http://localhost:3054/basket")
    .then((res) =>
      dispatch({ type: ActionTypes.SET_BASKET, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: ActionTypes.SET_BASKET_ERROR, payload: err })
    );
};

//sepete yeni eleman ekler
//hem api günceller hemde storu
export const addToBasket = (product) => (dispatch) => {
  //1) yeni bir obje oluşturup miktarı 1 olarak ekle
  const newProduct = { ...product, amount: 1 };
  //2) objeden gereksiz verileri kaldır
  delete newProduct.specs;
  delete newProduct.color;
  delete newProduct.title;
  //3) api a ürünü kaydet
  axios
    .post("http://localhost:3054/basket", newProduct)
    //4) store a yeni ürünü ekle
    .then(() => {
      dispatch({
        type: ActionTypes.ADD_TO_BASKET,
        payload: newProduct,
      });
    });
};

//sepette olan elemanın miktarını 1 arttırır
export const updateItem = (product) => (dispatch) => {
  axios
    .patch(`http://localhost:3054/basket/${product.id}`, {
      amount: product.amount + 1,
    })
    .then(() =>
      dispatch({ type: ActionTypes.UPDATE_ITEM, payload: product.id })
    );
};

//sepetteki elemanı silen
export const deleteItem = (id) => (dispatch) => {
  axios.delete(`http://localhost:3054/basket/${id}`).then(() => {
    dispatch({ type: ActionTypes.REMOVE_ITEM, payload: id });
  });
};

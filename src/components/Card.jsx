import { useDispatch } from "react-redux";
import { addToBasket, updateItem } from "../redux/actions/basketActions";
import { useSelector } from "react-redux";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.basket);

  //eğerki ekrana bastığımız elemandan sepette varsa
  //miktarı arttır butonu koy sepette yoksa sepete ekle butonu ekle
  //bunun için ürünün sepette olup olmadığını kontrol et
  const found = state.basket.find((item) => item.id === product.id);

  //ürün sepette varsa miktarını arttır yoksa sepete ekle
  const handleClick = () => {
    if (found) {
      dispatch(updateItem(found));
    } else {
      dispatch(addToBasket(product));
    }
  };
  return (
    <div className="card pt-4" style={{ width: "18rem" }}>
      <div className="d-flex justify-content-center">
        <img src={product.image} width={200} height={200} className="rounded" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p>
          <span className="fw-bold me-2">{product.make}</span>
          <span>{product.model}</span>
        </p>
        <p className="d-flex flex-column">
          {product.specs.map((spec, i) => (
            <span key={i}>{spec}</span>
          ))}
        </p>

        <button onClick={handleClick} className="w-100">
          {found ? `miktarı arttır (${found.amount}) ` : "sepete ekle"}
        </button>
      </div>
    </div>
  );
};

export default Card;

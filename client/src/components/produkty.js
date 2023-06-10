import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";

const Produkty = () => {
  const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/get").then((data) => {
      setData(data.data);
    });
    console.log(data);
  }, []);

  const AddToBagHandle = (productID) => {
    console.log(productID);
    const userId = cookies.userId;
    let data = { productID, userId };
    Axios.post(`http://localhost:8000/api/AddProductToBag`, data);
  };

  return (
    <>
      <h1>Wszytkie Produkty Yahoo-Store :</h1>

      <section className="featured-products">
        <div className="product-container">
          {data?.map((product) => {
            return (
              <div className="product">
                <a href="#" className="">
                  <img
                    src={`http://localhost:8000/${product._id}_0.jpg`}
                    alt="Produkt 1"
                  />
                </a>
                <h4>{product.product_name}</h4>
                <p>{product.product_price}zł</p>
                <button
                  id="produkt1"
                  className="btn"
                  onClick={() => {
                    AddToBagHandle(product._id);
                  }}
                >
                  Dodaj do koszyka
                </button>
                <div className="customer-reviews">
                  <h5>Opinie klientów:</h5>
                  {product.product_rewiews?.map((rewiew) => {
                    console.log(rewiew);
                    return (
                      <>
                        <div>
                          <p>{rewiew.product_rewiew}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Produkty;

import Axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const JedenProdukt = (props) => {
  const productId = props.item[0];

  const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
  const [productData, setProductData] = useState();
  const [productAmount, setProductAmount] = useState(props.item[1]);

  useEffect(() => {
    if (!productData) {
      Axios.get(`http://localhost:8000/api/getOneProduct/${productId}`).then(
        (data) => setProductData(data.data[0])
      );
    }
  }, []);

  const deleteFromCart = async (productId) => {
    const userId = cookies.userId;
    const response = await fetch("http://localhost:8000/api/deleteFromBag", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, productId }),
    });
    if (response.ok) {
      window.location = "/koszyk";
    }
  };

  const changeAmountHandle = (value) => {
    setProductAmount(value);
  };

  let style = {
    backgroundImage: `url(http://localhost:8000/${productId}_0.jpg)`,
  };
  return (
    <div className="w-full flex justify-center ">
      <div className="w-1/2 h-20 rounded-xl flex overflow-hidden items-center my-2 px-2 bg-zinc-100 relative">
        <div
          style={style}
          className="h-16 w-16 bg-cover bg-center rounded-full"
        ></div>
        <div className="w-3/5 pl-6">
          <h1 className=" text-base text-black">{productData?.product_name}</h1>
          <input
            type="number"
            className="w-12 h-4"
            defaultValue={productAmount}
            min="1"
            max=""
            onChange={(e) => changeAmountHandle(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col items-center w-16 right-0 absolute">
          <h1 className="text-xl text-black">{productData?.product_price}zł</h1>
          <button
            className="bg-red-600 text-red w-fit px-1 rounded"
            onClick={() => deleteFromCart(productId)}
          >
            Del
          </button>
        </div>
      </div>
    </div>
  );
};

export default JedenProdukt;

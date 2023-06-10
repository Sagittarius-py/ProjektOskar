import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import JedenProdukt from "./jedenProdukt";

const Koszyk = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["koszyk"]);

  var [koszyk, setKoszyk] = useState([]);

  useEffect(() => {
    if (cookies.userId) {
      Axios.get(
        `http://localhost:8000/api/getShoppingBag/${cookies.userId}`
      ).then((data) => {
        setKoszyk(data.data);
      });
    }
  }, []);

  return (
    <>
      <h1>Koszyk Yahoo-Store :</h1>

      <div id="cart-items">
        {koszyk.length > 0
          ? koszyk?.map((item, key) => {
              return <JedenProdukt item={item} key={key} />;
            })
          : null}
      </div>
    </>
  );
};

export default Koszyk;

const Header = () => {
  const style = { color: "#8c00ff" };

  const style2 = {
    top: "0",
    width: "100%",
  };

  return (
    <header style={style2}>
      <nav>
        <a href="index.html">
          <div className="logo">
            <img
              src={require("../zdjecia/logoyahoostore.png")}
              alt="Logo Yahoo Store"
            />
          </div>
        </a>
        <div className="navbar">
          <ul>
            <li>
              <a href="/">
                <i className="fa-solid fa-house" style={style}></i> Strona
                główna
              </a>
            </li>
            <li>
              <a href="/produkty">
                <i className="fa-solid fa-border-all" style={style}></i>
                Wszystkie Produkty
              </a>
            </li>
            <li>
              <a href="/logowanie">
                <i className="fa-solid fa-right-to-bracket" style={style}></i>
                Logowanie
              </a>
            </li>
            <li>
              <a href="/rejestracja">
                <i className="fa-solid fa-registered" style={style}></i>
                Rejestracja
              </a>
            </li>
            <li>
              <i className="fa-solid fa-cart-shopping" style={style}></i>
              <a href="/koszyk">
                <h4> Koszyk :</h4>
              </a>
            </li>
            <ul id="cart"></ul>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

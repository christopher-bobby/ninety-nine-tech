import "./index.css";
import logo from "../../assets/logo.webp";

const Header = () => {
  return (
    <div className="header">
      <img
        src={logo}
        alt="Token Swap Logo"
        className="logo-icon"
      />
    </div>
  );
};

export default Header;
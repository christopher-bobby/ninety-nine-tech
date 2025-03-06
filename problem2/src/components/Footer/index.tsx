import "./index.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Token Swap. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
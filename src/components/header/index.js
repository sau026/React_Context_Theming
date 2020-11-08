import React, { useContext } from "react";
import ThemeContext from "../../context/themeContext";
import "./index.scss";

const Header = (props) => {
  const { dark, toggle } = useContext(ThemeContext);
  return (
    <header className="header__component-container -container">
      <div className="header__site-branding -site-text-size">
        <div>
          <span>{props.headerTitle}</span> {/*--Header as a props--*/}
        </div>
        <div></div>
        {/* Theme */}
        <div onClick={() => toggle()} stopPropagation>
          <span title="switch theme" style={{ cursor: "pointer" }}>
            Select Theme ----
            {!dark ? "🌙" : "☀️"}
          </span>
        </div>
        <nav className="header__site-nav"></nav>
      </div>
    </header>
  );
};

export default Header;

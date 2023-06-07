import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const PageTopBanner = ({ pagename }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pagename}-DigiCom.</title>
      </Helmet>
      <div className="page-banner">
        <p>
          <Link to="/">HOME</Link> / <span>{pagename}</span>
        </p>
      </div>
    </>
  );
};

export default PageTopBanner;

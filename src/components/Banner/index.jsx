import React from "react";
import PropTypes from "prop-types";
import "./Banner.scss";
function Banner(props) {
  const { title, backgroundUrl } = props;

  const bannerBackground = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};
  return (
    <section className="banner" style={bannerBackground}>
      <h1 className="banner__title">{title}</h1>
    </section>
  );
}

Banner.propTypes = {
  title: PropTypes.string,
  backgroundUrl: PropTypes.string,
};

Banner.defaultProps = {
  title: "",
  backgroundUrl: "",
};

export default Banner;

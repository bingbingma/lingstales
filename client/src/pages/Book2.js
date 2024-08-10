import React, { Component } from "react";
import ControlledCarouselBook2 from "../components/carousel/carouselBook2";
import Comments_Section from "../components/commentmaster";

class Book2 extends Component {
  render() {
    return (
      <div>
        <ControlledCarouselBook2 />
        {/* <Comments_Section /> */}
      </div>
    );
  }
}

export default Book2;

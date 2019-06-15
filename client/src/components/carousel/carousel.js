// TEST COMMENT
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide3 from "../../images/Slide3.JPG";
import Slide4 from "../../images/Slide4.JPG";
import Slide5 from "../../images/Slide5.JPG";
import './carousel.css';
class Carousel extends React.Component{
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      autoPlay: false,
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={Slide3}/>
        </div>
        <div>
        <img src={Slide4}/>
        </div>
        <div>
        <img src={Slide5}/>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    );
  }
}
export default Carousel;
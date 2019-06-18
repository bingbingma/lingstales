import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide3 from "../../images/Slide3.JPG";
import Slide4 from "../../images/Slide4.JPG";
import Slide5 from "../../images/Slide5.JPG";
import './carousel.css';
import API from "../../utils/API";

class Carousel extends React.Component{
  state = {
    pages: []
  };

  componentDidMount() {
    this.loadPages();
  }

  loadPages = () => {
    API.getPages()
      .then(res =>
        this.setState({
          pages: res.data
        })
      )
      .catch(err => console.log(err));
  };

  
  render() {

    console.log(this.state.pages);
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
{this.state.pages.map(image => (
  <img src={image.imageUrl} />
))}
          {/* <img src={Slide3}/> */}
        </div>
      </Slider>
    );
  }
}
export default Carousel;
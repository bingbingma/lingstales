// TEST COMMENT
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import API from "../../utils/API";

class Carousel extends React.Component {
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
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      autoPlay: false
    };
    return (
      <Slider {...settings}>
        {this.state.pages.map(image => (
          <div>
            <img src={image.imageUrl} alt={image.pageNumber} />
          </div>
        ))}
      </Slider>
    );
  }
}
export default Carousel;

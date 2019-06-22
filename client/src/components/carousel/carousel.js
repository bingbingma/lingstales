// TEST COMMENT
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import API from "../../utils/API";
import pageImages from "../../images";

class Carousel extends React.Component {
  state = {
    pages: []
  };

  componentDidMount() {
    console.log("[DEBUG] image hack", pageImages);
  }

  loadBook = () => {
    API.getBook()
      .then(res => {
        this.setState({
          book: res.data
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  //concactenates into a URL
  // getImageUrl(index) {
  //   return "../../images/Slide" + index + ".JPG";
  // };

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoPlay: false,
      infinite: true,
      fade: true,
      cssEase: "linear"
    };

    return (
      <Slider {...settings}>
        {pageImages.map(imageSrc => (
          <div>
            <img src={imageSrc} />
          </div>
        ))}
      </Slider>
    );
  }
}

export default Carousel;

// COMMENT BACKEND LINKS WHICH I PULLED OUT BECAUSE I DIDN"T KNOW HOW TO USE - DAVID
//         {/* {this.state.pages.map(image => (
//           <div>
//             <img src={image.imageUrl} alt={image.pageNumber} />
//           </div>
//         ))} */}
//         <div>
//         {/* for (var {i}=0;i<{Pictures.length})
//         <div>
// //         <img src={Slide14}/>
// //         </div>
//         </div> */}

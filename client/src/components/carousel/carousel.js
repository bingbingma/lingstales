//NONSTATIC DATABASE VERSION

// // TEST COMMENT
import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide4 from "../../images/Slide4.JPG";
import Slide5 from "../../images/Slide5.JPG";
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


    //VERSION OF STATIC HARD CODE
// // TEST COMMENT
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slide0 from "../../images/Slide0.JPG";
// import Slide1 from "../../images/Slide1.JPG";
// import Slide2 from "../../images/Slide2.JPG";
// import Slide3 from "../../images/Slide3.JPG";
// import Slide4 from "../../images/Slide4.JPG";
// import Slide5 from "../../images/Slide5.JPG";
// import Slide6 from "../../images/Slide6.JPG";
// import Slide7 from "../../images/Slide7.JPG";
// import Slide8 from "../../images/Slide8.JPG";
// import Slide9 from "../../images/Slide9.JPG";
// import Slide10 from "../../images/Slide10.JPG";
// import Slide11 from "../../images/Slide11.JPG";
// import Slide12 from "../../images/Slide12.JPG";
// import Slide13 from "../../images/Slide13.JPG";
// import Slide14 from "../../images/Slide14.JPG";
// import Slide15 from "../../images/Slide15.JPG";
// import Slide16 from "../../images/Slide16.JPG";
// import Slide17 from "../../images/Slide17.JPG";
// import Slide18 from "../../images/Slide18.JPG";
// import Slide19 from "../../images/Slide19.JPG";
// import Slide20 from "../../images/Slide20.JPG";
// import Slide21 from "../../images/Slide21.JPG";
// import Slide22 from "../../images/Slide22.JPG";
// import Slide23 from "../../images/Slide23.JPG";
// import Slide24 from "../../images/Slide24.JPG";
// import Slide25 from "../../images/Slide25.JPG";
// import Slide26 from "../../images/Slide26.JPG";
// import Slide27 from "../../images/Slide27.JPG";
// import Slide28 from "../../images/Slide28.JPG";
// import Slide29 from "../../images/Slide29.JPG";
// import './carousel.css';
// class Carousel extends React.Component{
//   render() {
//     const settings = {
//       // className: "center",
//       // dots: true,
//       // infinite: true,
//       // speed: 500,
//       // adaptiveHeight: true,
//       // slidesToShow: 1,
//       // slidesToScroll: 1,
//       // centerMode: true,
//       // centerPadding: '50px'
//       className: "center",
//       centerMode: true,
//       infinite: true,
//       centerPadding: "60px",
//       slidesToShow: 1,
//       speed: 500
//     };
//     return (
//       <Slider {...settings}>
//         <div>
//         <div>
//           <img src={Slide0}/>
//         </div>
//         <div>
//         <img src={Slide1}/>
//         </div>
//         <div>
//         <img src={Slide2}/>
//         </div>
//         <div>
//         <img src={Slide3}/>
//         </div>
//         <div>
//         <img src={Slide4}/>
//         </div>
//         <div>
//         <img src={Slide5}/>
//         </div>
//         <div>
//         <img src={Slide6}/>
//         </div>
//         <div>
//         <img src={Slide7}/>
//         </div>
//         <div>
//         <img src={Slide8}/>
//         </div>
//         <div>
//         <img src={Slide9}/>
//         </div>
//         <div>
//         <img src={Slide10}/>
//         </div>
//         <div>
//           <img src={Slide11}/>
//         </div>
//         <div>
//         <img src={Slide12}/>
//         </div>
//         <div>
//         <img src={Slide13}/>
//         </div>
//         <div>
//         <img src={Slide14}/>
//         </div>
//         <div>
//         <img src={Slide15}/>
//         </div>
//         <div>
//         <img src={Slide16}/>
//         </div>
//         <div>
//         <img src={Slide17}/>
//         </div>
//         <div>
//         <img src={Slide18}/>
//         </div>
//         <div>
//         <img src={Slide19}/>
//         </div>
//         <div>
//         <img src={Slide20}/>
//         </div>
//         <div>
//         <img src={Slide21}/>
//         </div>
//         <div>
//         <img src={Slide22}/>
//         </div>
//         <div>
//         <img src={Slide23}/>
//         </div>
//         <div>
//         <img src={Slide24}/>
//         </div>
//         <div>
//         <img src={Slide25}/>
//         </div>
//         <div>
//         <img src={Slide26}/>
//         </div>
//         <div>
//         <img src={Slide27}/>
//         </div>
//         <div>
//         <img src={Slide28}/>
//         </div>
//         <div>
//         <img src={Slide29}/>
//         </div>
//         </div>
//       </Slider>
//     );
//   }
// }
// export default Carousel;
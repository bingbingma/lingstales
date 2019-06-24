// TEST COMMENT
import React, {Component} from "react";
// import Carousel from 'react-bootstrap/Carousel'
// import API from "../../utils/API";
import pageImages from '../../images';
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {

  componentDidMount() {
    console.log("[DEBUG] image hack", pageImages)
  }

  render() {

    return (

    <Carousel>
      {pageImages.map((imageSrc) => <div><img  src={imageSrc} /></div>)}
    </Carousel>

);
};
};

export default DemoCarousel;


// COMMENT BACKEND LINKS WHICH I PULLED OUT BECAUSE I DIDN"T KNOW HOW TO USE - DAVID
  // loadPages = () => {
  //   API.getPages()
  //     .then(res => {

  //       this.setState({
  //         pages: res.data
  //       })
  //       console.log(res)
  //     })
  //     .catch(err => console.log(err));
  // };

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
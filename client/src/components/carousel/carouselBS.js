// TEST COMMENT
import React, {Component} from "react";
import Carousel from 'react-bootstrap/Carousel'
// import API from "../../utils/API";
import pageImages from '../../images';



class BSCarousel extends Component {
    

  componentDidMount() {
    console.log("[DEBUG] image hack", pageImages)
  }

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

  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }


  
  render() {
    const { index, direction } = this.state;

    return (

<Carousel>
{pageImages.map((imageSrc) => <Carousel.Item><img className="d-block w-100" src={imageSrc} alt="Image"/></Carousel.Item>)}
</Carousel>

);
};
};

export default BSCarousel;


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
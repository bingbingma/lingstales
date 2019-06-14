import React from "react";
import { Glide } from "react-glide";
import "react-glide/lib/reactGlide.css";
import Slide3 from "../images/Slide3.JPG";
import Slide4 from "../images/Slide4.JPG";
import Slide5 from "../images/Slide5.JPG";
class Carousel extends React.Component{
    render(){
        return(
            <div>
            <Glide
              height={400}
              width={1000}
              autoPlay={false}
              autoPlaySpeed={2000}
              dots={false}
              infinite={true}
              onSlideChange={() => console.log("slide changed")}
            >
              <img src={Slide3} />
              <img src={Slide4} />
              <img src={Slide5} />
              <div>
              </div>
            </Glide>
          </div>
        );
    }
}
export default Carousel;
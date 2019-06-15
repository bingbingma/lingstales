import React from "react";
import { Glide } from "react-glide";
import "react-glide/lib/reactGlide.css";
import API from "../utils/API";

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
    console.log(this.state.pages);
    return (
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
          {this.state.pages.map(image => (
            <img src={image.imageUrl} />
          ))}
          <div />
        </Glide>
      </div>
    );
  }
}
export default Carousel;

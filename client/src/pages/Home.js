import React, { Component } from "react";
import image1 from "../images/Slide00.JPG";
import image2 from "../images/Slide00.JPG";
import image3 from "../images/Slide00.JPG";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        {/* //side by side view of multiple book covers */}

        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h1 className="App-title">Ling's Tales</h1>
            </div>
            <div className="col-12">
              <h4 className="App-subtitle">
                View the complete collection below!
              </h4>
            </div>
          </div>
        </div>
        {/* <!-- bootstrap NEW version -->
      <!-- FIRST ROW --> */}
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <img className="img-fluid" src={image1} alt="Book 1" />
                <div className="container-fluid plabel">
                  <h6>Book 1:</h6>
                  <h5>The Emperor's Seed</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <img className="img-fluid" src={image2} alt="Book 2" />
                <div className="container-fluid plabel">
                  <h6>Book 2 (Coming Soon!):</h6>
                  <h5>Weighing the Elephant</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <img className="img-fluid" src={image3} alt="Book 3" />
                <div className="container-fluid plabel">
                  <h6>Book 3:</h6>
                  <h5>Coming Soon!</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

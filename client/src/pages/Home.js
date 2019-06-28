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
            <div className="col-12 App-description">
              <p>
                This website features a book series set in ancient China
                involving the main character Ling. The Ling's Tales series
                feature bilingual books, with English and Simplified Chinese +
                Pinyin for pronunciation. I illustrated and wrote the story from
                my childhood memory of the folktale. My wife, Stacy, adapted and
                translated the Chinese version. You can read the full books for
                free online, or buy print copies on Amazon. David
              </p>
            </div>
          </div>
        </div>
        {/* <!-- bootstrap NEW version -->
      <!-- FIRST ROW --> */}
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 col-12">
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
          <div className="col-md-4 col-lg-4 col-sm-12 col-12">
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
          <div className="col-md-4 col-lg-4 col-sm-12 col-12">
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

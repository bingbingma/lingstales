import React, { Component } from "react";
import image1 from "../images/Book1_Cover.JPG";
import image2 from "../images/Book2_Cover.JPG";
import image3 from "../images/Book3_cover.JPG";

{/* <link rel="stylesheet" href="css/styleR.css"></link> */}
class Home extends Component {
    render() {
      return (
        <div className="Home">
  {/* //side by side view of multiple book covers */}
  
  {/* <!-- Portfolio Section --> */}
<div class="card">
  <div class="card-header" id="subheading">
    <h3><strong>Portfolio</strong></h3>
  </div>
  {/* <!-- bootstrap NEW version -->
      <!-- FIRST ROW --> */}
  <div class="row">
    <div class="col-sm-4">
      <div class="card">
          <div class="card-body">
              <img class="img-fluid" src={image1} alt="Book 1" />
              <h6 class="container-fluid plabel" id="left">Book 1: The Emperor's Seed</h6>
            </div>
        </div>
      </div>
      <div class="col-sm-4">
          <div class="card">
              <div class="card-body">
                  <img class="img-fluid"  src={image2} alt="Book 2" />
                  <h6 class="container-fluid plabel">Book 2: Weighing the Elephant Coming Soon!</h6>
                </div>
            </div>
          </div>
          <div class="col-sm-4">
              <div class="card">
                  <div class="card-body">
                      <img class="img-fluid"  src={image3} alt="Book 3" />
                      <h6 class="container-fluid plabel">Book 3: Coming Soon!</h6>
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
// TEST COMMENT
import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
// import Carousel from 'react-bootstrap/Carousel'
// import Container from 'react-bootstrap/Container'
import "./carousel.css";
import pageImages from "../../images";

class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
      <Container>
        <Row>
          <Col sm={1} />
          <Col sm={10}>
            {" "}
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={this.handleSelect}
              interval={null}
            >
              {pageImages.map(imageSrc => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={imageSrc}
                    alt="Image"
                    bsClass="carousel-image"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col sm={1} />
        </Row>
      </Container>
    );
  }
}

export default ControlledCarousel;

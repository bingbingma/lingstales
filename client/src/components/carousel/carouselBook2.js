import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "./carousel.css";
import book2Images from "../../images/book2";

class ControlledCarouselBook2 extends React.Component {
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
          <Col sm={2} />
          <Col sm={8}>
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={this.handleSelect}
              interval={null}
            >
              {book2Images.map((imageSrc, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={imageSrc}
                    alt={`Slide ${idx}`}
                    bsClass="carousel-image"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    );
  }
}

export default ControlledCarouselBook2;

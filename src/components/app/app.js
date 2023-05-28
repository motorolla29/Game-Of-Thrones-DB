import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar/randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends Component {
  state = { isRandomChar: true };

  render() {
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {this.state.isRandomChar ? <RandomChar /> : null}
              <button
                style={{
                  margin: '10px 0',
                  padding: '5px',
                  color: 'white',
                  backgroundColor: '#131929',
                  borderRadius: '5px',
                }}
                onClick={() => {
                  this.setState({ isRandomChar: !this.state.isRandomChar });
                }}
              >
                Toggle random character
              </button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage/characterPage';

export default class App extends Component {
  state = { isRandomChar: true, error: false };

  componentDidCatch() {
    console.log('error');
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

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
                  marginBottom: '5em',
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
          <CharacterPage />
        </Container>
      </>
    );
  }
}

import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import GotService from '../../services/gotService';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import BooksPage from '../booksPage/booksPage';
import HousePage from '../housesPage/housesPage';

export default class App extends Component {
  state = { showRandomChar: true, error: false };
  gotService = new GotService();

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
              {this.state.showRandomChar ? <RandomChar /> : null}
              <button
                className="toggle-btn"
                onClick={() => {
                  this.setState({ showRandomChar: !this.state.showRandomChar });
                }}
              >
                Toggle random character
              </button>
            </Col>
          </Row>
          <CharacterPage />
          <BooksPage />
          <HousePage />
        </Container>
      </>
    );
  }
}

import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import GotService from '../../services/gotService';
import './app.css';
import Header from '../header';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

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
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({ name }) => name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

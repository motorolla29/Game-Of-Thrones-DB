import React, { Component } from 'react';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import { withRouter } from 'react-router-dom';

class BooksPage extends Component {
  gotService = new GotService();
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(`/books/${itemId}`);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => name}
      />
    );
  }
}
export default withRouter(BooksPage);

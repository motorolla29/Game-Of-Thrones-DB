import React, { Component } from 'react';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {
  gotService = new GotService();
  state = {
    selectedBook: 1,
    error: false,
  };

  componentDidCatch() {
    console.log('error');
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({
      selectedBook: id,
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => name}
      />
    );

    const bookDetails = (
      <ItemDetails
        getItem={(id) => this.gotService.getBooks(id)}
        itemsType="book"
        itemId={this.state.selectedBook}
      >
        <Field field="name" label="Name" />
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} rigth={bookDetails} />;
  }
}

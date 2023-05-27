import React, { Component } from 'react';
import './itemList.css';
import GotService from "../../services/gotService";

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }

        this.getAllCharacters();
    }

    gotService = new GotService();

    getAllCharacters() {
        this.gotService.getAllCharacters()
            .then(items => {
                items = items.map((item, id) => {
                    return (
                        <li key={id} onClick={() => { this.props.getCharId(41 + id) }} className="list-group-item">
                            {item.name}
                        </li>
                    )
                })

                this.setState({
                    data: items
                })
            })
    }


    render() {
        return (
            <ul className="item-list list-group">
                {this.state.data}
            </ul>
        );
    }
}
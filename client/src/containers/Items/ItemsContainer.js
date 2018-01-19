import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items';
import { fetchItemsAndUsers } from '../../redux/modules/items';

class ItemsContainer extends Component {
    static propTypes = {};
    componentDidMount() {
        this.props.dispatch(fetchItemsAndUsers());
    }
    render() {
        return (
            <Items
                itemsData={this.props.itemsData}
                isLoaded={this.props.isLoaded}
            />
        );
    }
}
const mapStateToProps = state => ({
    isLoaded: state.items.isLoaded,
    itemsData: state.items.itemsData,
    error: state.items.error
});
export default connect(mapStateToProps)(ItemsContainer);

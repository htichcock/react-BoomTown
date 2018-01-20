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
                isLoading={this.props.isLoading}
                itemsFilters={this.props.itemsFilters}
            />
        );
    }
}
const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    itemsData: state.items.itemsData,
    itemsFilters: state.items.itemsFilters,
    error: state.items.error
});
export default connect(mapStateToProps)(ItemsContainer);

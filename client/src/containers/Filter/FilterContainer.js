import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { getItemsFiltered } from '../../redux/modules/items';

class FilterContainer extends Component {
    static propTypes = {};
    constructor() {
        super();
        this.state = {
            values: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event, index, values) => {
        this.setState({ values });
        this.props.dispatch(
            getItemsFiltered(this.props.itemsMaster, {
                filterBy: 'tag',
                filter: values
            })
        );
    };
    render() {
        return (
            <Filter
                handleChange={this.handleChange}
                values={this.state.values}
                itemsMaster={this.props.itemsMaster}
                isLoading={this.props.isLoading}
            />
        );
    }
}
const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    itemsMaster: state.items.itemsMaster,
    error: state.items.error
});
export default connect(mapStateToProps)(FilterContainer);

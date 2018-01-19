import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { getProfileItemsFiltered } from '../../redux/modules/profile';

class ProfileFilterContainer extends Component {
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
            getProfileItemsFiltered(this.props.profileItemsMaster, {
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
                itemsMaster={this.props.profileItemsMaster}
                isLoaded={this.props.isLoaded}
            />
        );
    }
}
const mapStateToProps = state => ({
    isLoaded: state.profile.isLoaded,
    profileItemsMaster: state.profile.profileItemsMaster,
    error: state.profile.error
});
export default connect(mapStateToProps)(ProfileFilterContainer);

import React, { Component } from 'react';

import Share from './Share';

export default class ShareContainer extends Component {
    constructor() {
        super();
        this.state = {
            finished: false,
            stepIndex: 0
        };
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };
    render() {
        return <Share />;
    }
}

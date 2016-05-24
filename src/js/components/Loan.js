'use strict';

import React from 'react';

class Loan extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps !== this.props;
    }

    componentWillMount () {
        this.setState({});
    }

    render () {
        return (
            <div className="">

            </div>
        );
    }
}

export default Loan;

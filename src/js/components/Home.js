'use strict';

import React from 'react';
import { PureComponent } from 'react-pure-render';
import { Link } from 'react-router';

class Home extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    render () {
        return (
            <row around>
                <column cols="12">
                    <Link to="/loan">Loan Calculator</Link>
                </column>
            </row>
        );
    }
}

export default Home;

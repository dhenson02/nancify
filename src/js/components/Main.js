'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Main extends React.Component {
    constructor ( props ) {
        super(props);
    }

    render () {
        return (
            <row around style={{ maxWidth: '960px', margin: '50px auto' }}>
                {this.props.children ?
                 React.cloneElement(this.props.children, this.props) :
                 null}
            </row>
        );
    }
}

const mapStateToProps = state => ({ data: { ...state }});
const mapDispatchToProps = dispatch => ({ dispatch: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Main);

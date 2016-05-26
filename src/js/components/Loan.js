'use strict';

import React from 'react';
import { PureComponent } from 'react-pure-render';
import { regFloat } from '../actions/constants';
import * as helpers from '../data/helpers';

class Loan extends React.Component {
    constructor ( props ) {
        super(props);
    }

    render () {
        const {
            loan,
            progress } = this.props.data;
        const {
            loanAmount,
            loanMonthly,
            loanAPR,
            loanDuration
        } = this.props.dispatch;
        const currentLoan = loan.get(progress);

        const status = helpers.getStatus(currentLoan);
        console.log(currentLoan, progress, status);
        return (
            <row around>
                <column cols="4">
                    <form className="forms">

                        <InputWrapper label="Initial"
                                      description="Enter starting amount in $USD">
                            <InitialAmount change={loanAmount}/>
                        </InputWrapper>

                        <InputWrapper label="Payment"
                                      description="Enter monthly payment amount in $USD">
                            <Monthly change={loanMonthly}/>
                        </InputWrapper>

                        <InputWrapper label="APR"
                                      description="Enter Annual Percentage Rate (APR)">
                            <APR change={loanAPR}/>
                        </InputWrapper>

                        <InputWrapper label="Duration"
                                      description="Enter number of months loan has left">
                            <Duration change={loanDuration}/>
                        </InputWrapper>

                    </form>
                </column>
                <column cols="5">
                    <Total total={status.get('total')} />
                    <Remaining remaining={status.get('remaining')} />
                </column>
            </row>
        );
    }
}

class InputWrapper extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate () {
        return false;
    }

    render () {
        return (
            <row>
                <label>{this.props.label}
                    <p className="desc">{this.props.description}</p>
                </label>
                {this.props.children}
            </row>
        );
    }
}

class InitialAmount extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    handleChange ( e ) {
        const text = e.target.value.trim().replace(regFloat, ( text, d1, d2 ) => {
            d2 = d2.length > 1 ?
                 d2 :
                 ( d2.length === 1 ?
                   `${d2}0` :
                   '00'
                 );
            return `${parseInt(d1,10)||0}.${d2}`;
        });
        const val = parseFloat(text);
        this.props.change(val);
        e.target.value = text;
    }

    handleKeyDown ( e ) {
        /*const code = e.which || e.keyCode || e.charCode;
        if ( // Use constants.codes to do a quick lookup pass/fail instead of this
        !( code > 45 || code < 58 ) && !( code > 95 || code < 106 ) && !( code > 34 && code < 38 ) &&
        code !== 110 &&
        code !== 190 &&
        code !== 8 &&
        code !== 9 &&
        code !== 39
        ) {
            e.preventDefault();
        }*/
    }

    render () {
        return (
            <input type="number"
                   id="loan-amount"
                   defaultValue="0.00"
                   onChange={e => this.handleChange(e)}
                   onKeyDown={e => this.handleKeyDown(e)}/>
        );
    }
}

class Monthly extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    handleChange ( e ) {
        const text = e.target.value.trim().replace(regFloat, ( text, d1, d2 ) => {
            d2 = d2.length > 1 ?
                 d2 :
                 ( d2.length === 1 ?
                   `${d2}0` :
                   '00'
                 );
            return `${parseInt(d1, 10) || 0}.${d2}`;
        });
        const val = parseFloat(text);
        this.props.change(val);
        e.target.value = text;
    }

    handleKeyDown ( e ) {
        /*const code = e.which || e.keyCode || e.charCode;
        if ( // Use constants.codes to do a quick lookup pass/fail instead of this
        !( code > 45 || code < 58 ) && !( code > 95 || code < 106 ) && !( code > 34 && code < 38 ) &&
        code !== 110 &&
        code !== 190 &&
        code !== 8 &&
        code !== 9 &&
        code !== 39
        ) {
            e.preventDefault();
        }*/
    }

    /*
     handleKeyUp ( e ) {
     e.preventDefault();
     e.stopPropagation();
     }*/

    render () {
        return (
            <input type="number"
                   id="loan-monthly"
                   defaultValue="0.00"
                   pattern="\d+\.\d\d"
                   onChange={e => this.handleChange(e)}
                   onKeyDown={e => this.handleKeyDown(e)}/>
        );
    }
}

class APR extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    handleChange ( e ) {
        const text = e.target.value.trim().replace(regFloat, ( text, d1, d2 ) => {
            d2 = d2.length > 1 ?
                 d2 :
                 ( d2.length === 1 ?
                   `${d2}0` :
                   '00'
                 );
            return `${parseInt(d1, 10) || 0}.${d2}`;
        });
        const val = parseFloat(text);
        this.props.change(val);
        e.target.value = text;
    }

    handleKeyDown ( e ) {
        /*const code = e.which || e.keyCode || e.charCode;
        if ( // Use constants.codes to do a quick lookup pass/fail instead of this
            !( code > 45 || code < 58 ) &&
            !( code > 95 || code < 106 ) &&
            !( code > 34 && code < 38 ) &&
            code !== 110 &&
            code !== 190 &&
            code !== 8 &&
            code !== 9 &&
            code !== 39
        ) {
            e.preventDefault();
        }*/
    }
/*
    handleKeyUp ( e ) {
        e.preventDefault();
        e.stopPropagation();
    }*/

    render () {
        return (
            <input type="number"
                   id="loan-apr"
                   defaultValue="0.00"
                   pattern="\d+\.\d\d"
                   onChange={e => this.handleChange(e)}
                   onKeyDown={e => this.handleKeyDown(e)}/>
        );
    }
}

class Duration extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    handleChange ( e ) {
        const val = parseInt(e.target.value.trim(), 10) || 0;
        this.props.change(val);
        e.target.value = val;
    }

    handleKeyDown ( e ) {
        /*const code = e.which || e.keyCode || e.charCode;
        if ( // Use constants.codes to do a quick lookup pass/fail instead of this
        !( code > 45 || code < 58 ) && !( code > 95 || code < 106 ) && !( code > 34 && code < 38 ) &&
        code !== 110 &&
        code !== 190 &&
        code !== 8 &&
        code !== 9 &&
        code !== 39
        ) {
            e.preventDefault();
        }*/
    }

    render () {
        /*
         <select className="select"
         onChange={e => this.handleUnitChange(e)}
         ref="loanDurationUnit"
         defaultValue="0">
         <option value="0">Years</option>
         <option value="1">Months</option>
         <option value="2">Weeks</option>
         <option value="3">Days</option>
         </select>
         */
        return (
            <input type="number"
                   id="loan-duration"
                   ref="loanDuration"
                   defaultValue="0"
                   pattern="\d+"
                   onChange={e => this.handleChange(e)}
                   onKeyDown={e => this.handleKeyDown(e)}/>
        );
    }
}

class Total extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    render () {
        return (
            <h2>
                Total paid: ${this.props.total}
            </h2>
        );
    }
}

class Remaining extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    render () {
        return (
            <h2>
                Remaining: ${this.props.remaining}
            </h2>
        );
    }
}

export default Loan;

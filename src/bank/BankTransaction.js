import React, { Component } from 'react';
import {Col} from 'react-bootstrap';

class BankTransaction extends Component {

    /*
                        date={transaction.date}
                    description={transaction.description}
                    referenceId={transaction.referenceId}
                    amount={transaction.amount}
     */

    // Each transaction line contains the transaction date; a description; a unique reference number; and a monetary
    // amount which could be positive (cash in) or negative (cash out)
    render() {
        return <Col id="bank-transaction">
            Date: {this.props.date}
            Description: {this.props.description}
            Reference ID: {this.props.referenceId}
            Amount: {this.props.amount}
        </Col>;
    }
}

export default BankTransaction;

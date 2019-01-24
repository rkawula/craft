import React, { Component } from 'react';
import formatCents from "../util/Helpers";


class BankTransactionRow extends Component {
    // Each transaction line contains the transaction date; a description; a unique reference number; and a monetary
    // amount which could be positive (cash in) or negative (cash out)
    render() {
        return <tr id="bank-transaction">
            <td>{this.props.date}</td>
            <td>{this.props.referenceId}</td>
            <td>{this.props.description}</td>
            <td className="text-right">{formatCents(this.props.amount)}</td>
        </tr>;
    }
}

export default BankTransactionRow;

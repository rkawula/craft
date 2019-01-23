import React, { Component } from 'react';
import formatCents from "../util/Helpers";


class InvoiceRow extends Component {

    render() {
        return <tr id="invoice-transaction">
            <td>{this.props.date}</td>
            <td>{this.props.referenceId}</td>
            <td>{this.props.clientName}</td>
            <td class="text-right">{formatCents(this.props.amount)}</td>
            <td>{this.props.status}</td>
        </tr>;;
    }
}

export default InvoiceRow;
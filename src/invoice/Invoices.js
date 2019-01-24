import React, {Component} from 'react';
import {Grid} from "react-bootstrap";
import InvoiceTable from "./InvoiceTable";


/**
 * Invoices widget, which allows the user to:
 * 1) view existing invoices and their reference Id, client name, date, amount, and status (paid or unpaid).
 * 2) edit existing invoice reference ids, client names, dates, and amounts.
 *
 * TODO: allow user to create new invoices and fix amount UI formatting (dollars instead of cents).
 */
class Invoices extends Component {

    render() {
        let transactions = this.props.invoiceTransactions || [];

        return <Grid><InvoiceTable
            invoiceTransactions={transactions}
            invoiceStatus={this.props.invoiceStatus}
            updateInvoices={this.props.updateInvoices}
        /></Grid>;
    }
}

export default Invoices;

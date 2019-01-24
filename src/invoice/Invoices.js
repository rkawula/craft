import React, {Component} from 'react';
import {Grid, Table} from "react-bootstrap";
import InvoiceRow from "./InvoiceRow";


class Invoices extends Component {

    /*
    Each invoice contains the name of the client;
    the creation date;
     a unique reference number;
     a monetary amount, which could be positive (money to be received) or negative (a refund to the customer);
     and a status (PAID or NOT PAID).
     */

    render() {
        let transactions = this.props.invoiceTransactions || [];

        return <Grid>
                <h2>Invoices</h2>

                <Table id="invoice-table" striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reference ID</th>
                        <th>Client Name</th>
                        <th>Amount in USD</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((invoice, i) =>
                        <InvoiceRow
                            key={invoice + i}
                            date={invoice.date}
                            referenceId={invoice.referenceId}
                            clientName={invoice.clientName}
                            amount={invoice.amount}
                            status={this.props.invoiceStatus(invoice)}
                        />
                    )}
                    </tbody>
                </Table>
            </Grid>;
    }
}

export default Invoices;

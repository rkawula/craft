import React, {Component} from 'react';
import BankTransactionRow from './BankTransactionRow';
import {Grid, Table} from 'react-bootstrap';


class BankTransactions extends Component {

    render() {
        // Prevent null errors on missing props.
        let transactions = this.props.bankTransactions || [];
        // TODO: sorting (default by date).
        return <Grid>
            <Table id="bank" striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Reference ID</th>
                    <th>Description</th>
                    <th>Amount in USD</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, i) =>
                    <BankTransactionRow
                        key={transaction.referenceId + " " + i}
                        date={transaction.date}
                        description={transaction.description}
                        referenceId={transaction.referenceId}
                        amount={transaction.amount}
                    />
                )}
                </tbody>
            </Table>
        </Grid>;
    }
}

export default BankTransactions;

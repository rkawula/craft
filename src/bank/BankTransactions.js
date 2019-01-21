import React, { Component } from 'react';
import BankTransaction from './BankTransaction';
import {Grid, Row} from 'react-bootstrap';


class BankTransactions extends Component {

    render() {
        // Prevent null errors on missing props.
        let transactions = this.props.bankTransactions || [];
        return <Grid id="bank">
            {transactions.map((transaction, i) =>
                <Row><BankTransaction
                    key={transaction.referenceId}
                    date={transaction.date}
                    description={transaction.description}
                    referenceId={transaction.referenceId}
                    amount={transaction.amount}
                />
                </Row>
            )}
        </Grid>;
    }
}

export default BankTransactions;

import React, {Component} from 'react';
import BankTransactions from './bank/BankTransactions';
import Invoices from './invoice/Invoices';
import FinancialStatus from './finances/FinancialStatus';
import {PageHeader, Grid} from 'react-bootstrap';


class BusinessDashboard extends Component {

    constructor(props) {
        super(props);

        this.updateThreshold = this.updateThreshold.bind(this);
        this.invoiceStatus = this.invoiceStatus.bind(this);
    }

    componentWillMount() {
        // Should be result of AJAX calls to APIs.
        let bankTransactions = [
            {
                "date": "2019-01-25",
                "description": "Transaction A",
                "referenceId": "123D4azq5", // Assuming we don't want a guessable ID
                "amount": -23535 // In cents (no float math)
            },
            {
                "date": "2019-01-28",
                "description": "Transaction B",
                "referenceId": "09823DFqd3",
                "amount": 44222
            },
            {
                "date": "2019-02-03",
                "description": "Transaction C",
                "referenceId": "998h3kd",
                "amount": 10252
            },
            {
                "date": "2019-01-18",
                "description": "Transaction D",
                "referenceId": "asdf234",
                "amount": -1705
            }
        ];
        let referenceIdMap = {};
        for (let i = 0; i < bankTransactions.length; i++) {
            if (!(bankTransactions[i].referenceId in referenceIdMap)) {
                referenceIdMap[bankTransactions[i].referenceId] = [];
            }
            referenceIdMap[bankTransactions[i].referenceId].push(bankTransactions[i]);
        }
        this.setState({
            finances: {
                currentBalance: 123456,
                threshold: 15000
            },
            bankTransactions: bankTransactions,
            invoiceTransactions: [
                {
                    date: "2019-01-22", // Should be PAID
                    referenceId: "123D4azq5",
                    clientName: "John Smith",
                    amount: -23535 // In cents (no float math)
                },
                {
                    date: "2019-01-22", // Should be UNPAID; matches everything but name
                    referenceId: "09823DFqd3",
                    clientName: "Jane Smith",
                    amount: 44222
                },
                {
                    date: "2019-04-03", // Should be UNPAID
                    referenceId: "43266634sfq",
                    clientName: "Jane Smith",
                    amount: 10252
                }
            ],
            // Create map with referenceIDs as the keys for the bank transactions.
            referenceIdMap: referenceIdMap
        });
    }

    updateThreshold(event) {
        // Ensure we are always dealing with a string, not a number.
        let threshold = "" + event.target.value;
        // Validate user entered a number before updating the threshold.
        if (!isNaN(threshold)) {
            threshold = threshold.replace(".", "");
            if (threshold === "") {
                threshold = "0";
            }
            console.log("Fixed threshold: " + threshold);
            let newFinancesState = this.state.finances;
            newFinancesState.threshold = threshold;
            this.setState({
                finances: newFinancesState
            });
        }
    }

    filterThirtyDays(transactionList) {
        // TODO: replace with proper JS datetime library ie. moment.js
        let today = new Date();
        let thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
        // TODO: validate whether we should remove "future" transactions.
        return transactionList.filter((transaction) => new Date(transaction.date) > thirtyDaysAgo
            && new Date(transaction.date) < today).length;
    }

    invoiceStatus(invoice) {
        // An invoice is considered PAID if there is:
        // a bank transaction for the same amount
        // with the bank transaction’s reference number being equal to the invoice’s reference number
        // and with the bank transaction date being later than the invoice creation date.
        if (invoice.referenceId in this.state.referenceIdMap) {
            // Check list of transactions matching this refId; we are paid if we are <
            this.state.referenceIdMap[invoice.referenceId].find(transaction =>
                invoice.amount === transaction.amount && new Date(transaction.date) < new Date(invoice.date));
            return "PAID";
        }
        return "NOT PAID";
    }

    render() {
        return <Grid id="business-dashboard">
            <PageHeader>
                My Business
            </PageHeader>
            <FinancialStatus
                currentBalance={this.state.finances.currentBalance}
                threshold={this.state.finances.threshold}
                updateThreshold={this.updateThreshold}
                bankTransactionCount={this.filterThirtyDays(this.state.bankTransactions)}
                invoiceCount={this.filterThirtyDays(this.state.invoiceTransactions)}
            />
            <Invoices
                invoiceTransactions={this.state.invoiceTransactions}
                invoiceStatus={this.invoiceStatus}
            />
            <BankTransactions
                bankTransactions={this.state.bankTransactions}/>
        </Grid>;
    }
}

export default BusinessDashboard;

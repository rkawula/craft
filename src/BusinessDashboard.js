import React, {Component} from 'react';
import BankTransactions from './bank/BankTransactions';
import Invoices from './invoice/Invoices';
import FinancialStatus from './finances/FinancialStatus';
import {PageHeader, Grid} from 'react-bootstrap';


/**
 * The home page of the Business Dashboard. Displays three widgets;
 * 1) Financial Status, displaying:
 *  a) the current bank balance and configurable minimum threshold for a healthy balance,
 *  b) a UI element for editing the minimum threshold,
 *  c) count of invoice/bank transactions in the past 30 days
 * 2)
 */
class BusinessDashboard extends Component {

    constructor(props) {
        super(props);

        // Bind methods so that we can use them as callbacks.
        this.updateThreshold = this.updateThreshold.bind(this);
        this.invoiceStatus = this.invoiceStatus.bind(this);
        this.updateInvoices = this.updateInvoices.bind(this);
    }

    // Initial mount of component should create API calls to our data sources.
    // Stubbing responses for now.
    componentWillMount() {
        // Imagining that call to Bank transactions API returns a flat list (unsorted).
        let bankTransactions = [
            {
                date: "2019-01-25",
                description: "Transaction A",
                referenceId: "123D4azq5", // Assuming we don't want a guessable ID
                amount: -23535 // In cents (no float math)
            },
            {
                date: "2019-01-28",
                description: "Transaction B",
                referenceId: "09823DFqd3",
                amount: 44222
            },
            {
                date: "2019-02-03",
                description: "Transaction C",
                referenceId: "998h3kd",
                amount: 10252
            },
            {
                date: "2019-01-18",
                description: "Transaction D",
                referenceId: "asdf234",
                amount: -1705
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
                    date: "2019-01-22",
                    referenceId: "123D4azq5",
                    clientName: "John Smith",
                    amount: -23535 // In cents (no float math)
                },
                {
                    date: "2019-01-22",
                    referenceId: "09823DFqd3",
                    clientName: "Jane Smith",
                    amount: 44222
                },
                {
                    date: "2019-04-03",
                    referenceId: "43266634sfq",
                    clientName: "Jane Smith",
                    amount: 10252
                }
            ],
            // Create map with referenceIDs as the keys for the bank transactions.
            // We could also assume that this is the format sent to us by the API and have to flatten it; or we could
            // assume that this formatted data is by a second API call.
            // Creating refId keys to lists of transactions makes it a fast access of a map (rather than a linear O(n)
            // walk through the data list for transactions).
            // Unlike invoices, we do not plan to edit this map in the UI. we would need to update two data structures.
            referenceIdMap: referenceIdMap
        });
    }

    updateThreshold(event) {
        /**
         * Updates the threshold value. Does nothing if user input was not a valid number.
         * @type {string}
         */
        // Ensure we are always dealing with a string, not a number.
        let threshold = "" + event.target.value;
        // Validate user entered a number before updating the threshold.
        if (!isNaN(threshold)) {
            threshold = threshold.replace(".", "");
            let newFinancesState = this.state.finances;
            newFinancesState.threshold = threshold;
            this.setState({
                finances: newFinancesState
            });
        }
    }

    updateInvoices(invoices) {
        /**
         * Updates invoice state to match provided invoices.
         */
        this.setState({
            invoices: invoices
        });
    }

    countThirtyDays(transactionList) {
        /**
         * Returns the count of transactions from the past 30 days.
         * @type {Date}
         */
        // TODO: replace with proper JS datetime library ie. moment.js
        let today = new Date();
        let thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
        // TODO: validate whether we should remove "future" transactions.
        return transactionList.filter((transaction) => new Date(transaction.date) > thirtyDaysAgo
            && new Date(transaction.date) < today).length;
    }

    invoiceStatus(invoice) {
        /**
         * Returns the string invoice status (PAID or NOT PAID).
         */
        // An invoice is considered PAID if there is:
        // a bank transaction for the same amount
        // with the bank transaction’s reference number being equal to the invoice’s reference number
        // and with the bank transaction date being later than the invoice creation date.
        if (invoice.referenceId in this.state.referenceIdMap) {
            // Check list of transactions matching this refId for a perfect match.
            // Treating amounts as strings (otherwise strict === check will fail).
            if (this.state.referenceIdMap[invoice.referenceId].find(transaction =>
                "" + invoice.amount === "" + transaction.amount
                && new Date(transaction.date) > new Date(invoice.date))) {
                return "PAID";
            }
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
                bankTransactionCount={this.countThirtyDays(this.state.bankTransactions)}
                invoiceCount={this.countThirtyDays(this.state.invoiceTransactions)}
            />
            <Invoices
                invoiceTransactions={this.state.invoiceTransactions}
                invoiceStatus={this.invoiceStatus}
                updateInvoices={this.updateInvoices}
            />
            <BankTransactions
                bankTransactions={this.state.bankTransactions}/>
        </Grid>;
    }
}

export default BusinessDashboard;

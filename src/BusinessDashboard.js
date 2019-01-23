import React, {Component} from 'react';
import BankTransactions from './bank/BankTransactions';
import Invoices from './invoice/Invoices';
import FinancialStatus from './finances/FinancialStatus';
import {PageHeader, Tabs, Tab} from 'react-bootstrap';


class BusinessDashboard extends Component {
    /*
                        date={transaction.date}
                    description={transaction.description}
                    referenceId={transaction.referenceId}
                    amount={transaction.amount}
     */

    componentWillMount() {
        this.setState({
            "restData": {
                "bankTransactions": [
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
                ],
                "invoiceTransactions": [
                    {
                        "date": "2019-01-22", // Should be PAID
                        "referenceId": "123D4azq5",
                        "clientName": "John Smith",
                        "amount": -23535 // In cents (no float math)
                    },
                    {
                        "date": "2019-01-22", // Should be UNPAID; matches everything but name
                        "referenceId": "09823DFqd3",
                        "clientName": "Jane Smith",
                        "amount": 44222
                    },
                    {
                        "date": "2019-04-03", // Should be UNPAID
                        "referenceId": "43266634sfq",
                        "clientName": "Jane Smith",
                        "amount": 10252
                    }
                ]
            }
        })
    }

    render() {
        return <div id="business-dashboard">
            <PageHeader>
                My Financial Summary
            </PageHeader>
            <Tabs defaultActiveKey={1} id="tab-navigation">
                <Tab eventKey={1} title="Overall Financial Status">
                    <FinancialStatus/>
                </Tab>
                <Tab eventKey={2} title="Invoices">
                    <Invoices
                        invoiceTransactions={this.state.restData.invoiceTransactions}
                    />
                </Tab>
                <Tab eventKey={3} title="Bank Transactions">
                    <BankTransactions
                        bankTransactions={this.state.restData.bankTransactions}/>
                </Tab>
            </Tabs>
        </div>;
    }
}

export default BusinessDashboard;

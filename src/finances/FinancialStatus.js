import React, { Component } from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import formatCents from '../util/Helpers.js';
import './FinancialStatus.css';


class FinancialStatus extends Component {

    currentBalanceColor(currentBalance, threshold) {
        if (currentBalance < 0) {
            return "danger";
        }
        if (currentBalance < threshold) {
            return "warning";
        }
        return "healthy"
    }

    render() {
        return <Grid fluid id="bank-status">
            <h2>Financial Overview</h2>
            <Row>
                <Col xs={6}><h3>Current Balance:</h3></Col>
                <Col xs={6}>
                    <h3
                        id={"balance-" + this.currentBalanceColor(this.props.currentBalance, this.props.threshold)}>
                        ${formatCents(this.props.currentBalance)}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col xs={6}><h3>Warning threshold:</h3></Col>
                <Col xs={6}>
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                        >
                            <ControlLabel>Enter your bank balance warning threshold</ControlLabel>
                            <FormControl
                                type="text"
                                value={formatCents(this.props.threshold)}
                                placeholder="Enter threshold"
                                onChange={this.props.updateThreshold}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                    {/*<EditableTextField value={formatCents(this.props.threshold)} />*/}
                    {/*<EditableTextField*/}
                        {/*name='threshold'*/}
                        {/*value={formatCents(this.props.threshold)}*/}
                        {/*onSave={this.props.updateThreshold}*/}
                    {/*/>*/}
                </Col>
            </Row>
            <Row>
                <Col xs={6}><h3>Bank transactions in the past 30 days:</h3></Col>
                <Col xs={6}><h3>{this.props.bankTransactionCount}</h3></Col>
            </Row>
            <Row>
                <Col xs={6}><h3>Invoices created in the past 30 days:</h3></Col>
                <Col xs={6}><h3>{this.props.invoiceCount}</h3></Col>
            </Row>
            </Grid>;
    }
}

export default FinancialStatus;

import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../Money.css";


/**
 * Editable table for users to edit existing invoices. All columns except for Status are editable. After clicking out of
 * an edited cell, all relevant fields will update based on the new value (ie, status may change automatically from
 * PAID to UNPAID).
 *
 * TODO: format amount column.
 */
class InvoiceTable extends Component {
    constructor(props) {
        super(props);

        this.renderEditable = this.renderEditable.bind(this);
    }

    renderEditable(cellInfo) {
        /**
         * Method to handle user interactions within an editable cell.
         *
         * TODO: Create version to better handle amount column.
         */
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.props.invoiceTransactions];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.props.updateInvoices({data});
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.invoiceTransactions[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        return <div>
            <ReactTable
                data={this.props.invoiceTransactions}
                columns={[
                    {
                        Header: "Date",
                        accessor: "date",
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Reference ID",
                        accessor: "referenceId",
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Client Name",
                        accessor: "clientName",
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Amount",
                        accessor: "amount",
                        className: "money-column",
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Status",
                        id: "paid-status",
                        accessor: d =>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.props.invoiceStatus(d)
                                }}
                            />
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <br/>
        </div>
    };

}

export default InvoiceTable;

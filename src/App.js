import React, {Component} from 'react';
import BusinessDashboard from './BusinessDashboard';
import axios from 'axios';


/**
 * Initially perform GETs for all of the page data.
 *
 * Allow user to manipulate the page data into a new cached "delta" state field.
 *
 * Allow user to "save" the page data which performs a call back to the API & will update the original
 * requested data, in addition to erasing the delta field.
 *
 * If an error occurs, flash message to user & keep the delta field.
 */
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoices: {},
            bankTransactions: {},
            finances: {},
            delta: {}
        };
    }

    componentWillMount() {
        // // TODO: list & loop.
        // axios.get(`http://localhost:5000/invoices`).then((response) => {
        //     this.setState({
        //         invoices: response.data
        //     })
        // }).catch((error) => {
        //
        // });
        // axios.get(`http://localhost:5000/bank/transactions`).then((response) => {
        //     this.setState({
        //         bankTransactions: response.data
        //     })
        // }).catch((error) => {
        //
        // });
        // axios.get(`http://localhost:5000/finances`).then((response) => {
        //     this.setState({
        //         finances: response.data
        //     })
        // }).catch((error) => {
        //
        // });
    }

    render() {
        // TODO: Pull CSS from CDN into public directory for project, replace App.js with BusinessDashboard.js
        return (
            <div className="craft">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <BusinessDashboard bankData={this.state.data}/>
            </div>
        );
    }
}

export default App;

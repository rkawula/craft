import React, {Component} from 'react';
import BusinessDashboard from './BusinessDashboard';
// import axios from 'axios';


/**
 * Initially perform GETs for all of the page data.
 *
 * Allow user to manipulate some key aspects of the page state through the requested widgets.
 *
 * Allow user to "save" the page data which performs a call back to the API (or should we be constantly sending deltas?)
 *
 * TODO: If an error occurs during data persistence, flash message to user & keep the deltas locally.
 */
class App extends Component {

    componentWillMount() {
        // // TODO: list or urls & loop through
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

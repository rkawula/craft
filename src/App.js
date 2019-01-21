import React, {Component} from 'react';
import BusinessDashboard from './BusinessDashboard';
import Axios from 'axios';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restData: {}
        };
    }

    componentWillMount() {
        let data = {};

        // TODO: Axios get for data api(s).
        this.setState({
            'bankData': data
        });
    }

    render() {
        // TODO: Pull bootstrap CSS into public css for project, replace App.js with BusinessDashboard.js
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

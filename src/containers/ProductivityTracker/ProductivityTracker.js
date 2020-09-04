import React, {Component} from 'react';
import Activity from '../Activity/Activity';

class ProductivityTracker extends Component {
    render() {
        return (
            <div>
                <Activity duration={1000 * 60 * 60 * 5} name="Study"/>
            </div>
        );
    }
}

export default ProductivityTracker;
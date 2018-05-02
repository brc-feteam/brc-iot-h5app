import React, { Component } from "react";
// Layout
class BaseLayout extends Component {
    render() {
        return <div className="warp">
            {this.props.children}
        </div>
    }
}

export default BaseLayout
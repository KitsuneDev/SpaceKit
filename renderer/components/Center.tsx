import React, { Component } from 'react'

export default class Center extends Component {
    render() {
        return (
            <div>
            <div className="container">
                {this.props.children}
            </div>
            <style jsx>{`
            .container {
                position: absolute;
                top: 50%;
                left: 50%;
                -moz-transform: translateX(-50%) translateY(-50%);
                -webkit-transform: translateX(-50%) translateY(-50%);
                transform: translateX(-50%) translateY(-50%);
            }
            `}</style>
    </div>
        )
    }
}

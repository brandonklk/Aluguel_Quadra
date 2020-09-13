import React, { Component } from 'react'

class Loader extends Component {
    
    render () {
        const { loading } = this.props;
        let template = ''
        if (loading) 
            template = <div className="loading"><div className="loader"></div></div>
        
        return (
            template
        );
    }
}


export default Loader;
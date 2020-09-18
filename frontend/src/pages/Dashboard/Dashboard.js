import React, { Component, Fragment } from 'react'
import { Container, Row } from 'react-bootstrap'

import Loader from '../../component/Loader'
import Table from '../../component/Table'

import ActionsUserRegistration from '../../actions/UserRegistration/UserRegistration'

import './Dashboard.css'

class Dashboard extends Component {
    constructor (props) {
        super(props)
        this.state = this.getInitialize()

        ActionsUserRegistration.getUsers()
            .then((r) => {
                r.forEach(element => {
                    delete element.id   
                    delete element.passwordHash   
                });
                this.setState({body: r})
            })
    }    

    getInitialize = () => {
        return {
            loading: false,
            head: ['Nome', 'Email', 'Número'],
            body: []
        }
    }

    clearState = () => {
        console.log('this.stateInitial',this.getInitialize())
        this.setState(this.getInitialize())
    }
    
    render () {
        return (
            <Fragment>
                <Loader loading={this.state.loading}/>
                <Container className="Dashboard">
                <h1 className="title">Dashboard</h1>
                    <Row>
                        <Table head={this.state.head} body={this.state.body}/>
                    </Row>
                </Container>
            </Fragment>
        );
    }

}

export default Dashboard
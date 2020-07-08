import React, { Component, Fragment } from 'react';
import { Navbar, InputGroup, Form, FormControl, Button, Dropdown, Card, Row, Col, Nav, Toast } from 'react-bootstrap';
import Header from '../header';
import { FaTrash, FaPlus, FaCheckCircle, FaFilter } from 'react-icons/fa';
import { deleteWorkFlow, editWorKFLow, selectedWorkflow } from '../actions';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            selectedFilter: '',
            showNotification: false
        }
    }

    async deleteWorkFlow(id) {
        const { deleteWorkFlow } = this.props;
        await deleteWorkFlow({
            workFlowId: id
        });
    }

    async editWorkFlow(id, currentStatus) {
        const { editWorKFLow, workflows } = this.props;
        if (workflows[id]) {
            const ableToUpdate = workflows[id].nodes.every(({ status }) => ['inprogress', 'pending'].includes(status));
            if (ableToUpdate) {
                return await this.setState({
                    showNotification: true
                });
            }
            let status = '';
            switch (currentStatus) {
                case 'pending':
                    status = 'complete';
                    break;
                case 'complete':
                    status = 'complete';
                    break;
            }
            await editWorKFLow({
                status,
                workFlowId: id
            });
        }

    }

    async addEditWorkFlow(id) {
        const { selectedWorkflow, history } = this.props;
        await selectedWorkflow(id);
        history.push('/workflow')
    }


    render() {
        const { history, workflows = {} } = this.props;
        const { search, selectedFilter, showNotification } = this.state;
        const workflowsArray = search.trim().length ? Object.values(workflows).filter(({
            title
        }) => title.toLowerCase().includes(search.toLowerCase())) : Object.values(workflows);
        const workflowsArrayFiltered = selectedFilter ? workflowsArray.filter(({ status }) => status === selectedFilter) : workflowsArray;
        return (
            <Fragment>
                <Header {...{
                    history
                }} />
                <Form inline>
                    <Navbar bg="light" expand="lg" className="w-100">
                        <Form.Group controlId='search'>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                    value={search}
                                    onChange={(e) => this.setState({
                                        search: e.target.value
                                    })}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="d-flex align-item-center">
                                <Dropdown className="d-flex align-item-center mt-2">
                                    <Dropdown.Toggle variant={
                                        selectedFilter === 'pending' ? 'outline-secondary' : selectedFilter === 'complete' ? 'outline-success' : 'outline-dark'
                                    }

                                        className="ml-2" id="dropdown-basic" style={{
                                            textTransform: 'capitalize'
                                        }}>
                                        <FaFilter />  {selectedFilter || 'All'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                            this.setState({
                                                selectedFilter: ''
                                            })
                                        }}>All</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            this.setState({
                                                selectedFilter: 'complete'
                                            })
                                        }}>Completed</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            this.setState({
                                                selectedFilter: 'pending'
                                            })
                                        }}>Pending</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button className="ml-1 mt-2 d-flex align-items-center justify-content-between" variant="primary" type='button' onClick={() => this.addEditWorkFlow()}>
                                    <FaPlus className="mr-1" />
                                    Create Workflow</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Form>
                <div className="pt-1 d-flex">
                    <Row className="w-100 m-0">
                        {workflowsArrayFiltered.map(({ title, status, id }) => (<Col xs={12} md={3} key={id}>
                            <Card className="mt-2">
                                <FaTrash size="20" style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    right: -10,
                                    top: -10,
                                    overflow: 'visible',
                                    color: '#dc3545',
                                }} onClick={() => this.deleteWorkFlow(id)} />
                                <Card.Body>
                                    <Card.Title style={{
                                        cursor: 'pointer',
                                    }} onClick={() => this.addEditWorkFlow(id)}>{title}</Card.Title>
                                    <Card.Text className="d-flex align-items-center justify-content-between">
                                        <span style={{
                                            textTransform: 'capitalize'
                                        }}>
                                            {status}
                                        </span>
                                        <FaCheckCircle
                                            style={{
                                                color: status === 'pending' ? '#6c757d' : '#28a745'
                                            }}
                                            size="40" onClick={() => this.editWorkFlow(id, status)} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </div>
                {showNotification && <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: 'absolute',
                        minHeight: 100,
                        top: 0,
                        right: 0,
                        width: '100%'
                    }}
                >
                    <div className="d-flex align-items-center justify-content-end"
                        style={{
                            position: 'absolute',
                            minHeight: 100,
                            top: 5,
                            right: 0,
                            width: '100%'
                        }}
                    >
                        <Toast onClose={() => {
                            this.setState({
                                showNotification: false
                            })
                        }}>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                <strong className="mr-auto">Info</strong>
                            </Toast.Header>
                            <Toast.Body>Please check some nodes are in pending or in-progress state</Toast.Body>
                        </Toast>
                    </div>
                </div>}
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteWorkFlow: (workflow) => dispatch(deleteWorkFlow(workflow)),
    editWorKFLow: (workflow) => dispatch(editWorKFLow(workflow)),
    selectedWorkflow: (workflow) => dispatch(selectedWorkflow(workflow)),
})


const mapStateToProps = (store) => ({
    workflows: store.nodes.workflows
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
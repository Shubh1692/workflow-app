import React, { Component, Fragment } from 'react';
import { Navbar, InputGroup, Form, FormControl, Button, Modal, Card, Row, Col, Nav } from 'react-bootstrap';
import Header from '../header';
import { FaTrash, FaPlus, FaFile, FaCheckCircle, FaRandom } from 'react-icons/fa';
import { addNode, editNode, addWorkFlow, editWorKFLow, deleteWorkFlow, reArrangeNodes } from '../actions';
import { connect } from 'react-redux';

class WorkFLowPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddModal: false
        }
    }

    async openAddModal(openAddModal) {
        await this.setState({
            openAddModal
        });
    }

    async addNode(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form.elements.title.value;
        const description = form.elements.description.value;
        const { addNode, selectedWorkflow } = this.props;
        await addNode({
            title,
            description,
            status: 'pending',
            id: new Date().getTime(),
            workFlowId: selectedWorkflow.id
        });
        await this.setState({
            openAddModal: false
        });
    }

    async updateNode(currentStatus, nodeId) {
        const { editNode, selectedWorkflow } = this.props;
        let status = '';
        switch (currentStatus) {
            case 'pending':
                status = 'inprogress';
                break;
            case 'inprogress':
                status = 'complete';
                break;
            case 'complete':
                status = 'pending';
                break;
        }
        await editNode({
            nodeId,
            status,
            workFlowId: selectedWorkflow.id
        });
    }
    async addEditWorkFlow(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form.elements.title.value;
        const { addWorkFlow, selectedWorkflow, editWorKFLow } = this.props;
        if (selectedWorkflow) {
            await editWorKFLow({
                title,
                workFlowId: selectedWorkflow.id
            });
        } else {
            await addWorkFlow({
                title,
                id: new Date().getTime(),
                status: 'pending',
            });
        }
    }

    async deleteWorkFlow(e) {
        const { deleteWorkFlow, selectedWorkflow, history } = this.props;
        if (selectedWorkflow) {
            await deleteWorkFlow({
                workFlowId: selectedWorkflow.id
            });
            history.push('/home');
        }
    }

    async reArrangeNodes() {
        const { reArrangeNodes, selectedWorkflow } = this.props;
        if (selectedWorkflow) {
            await reArrangeNodes(selectedWorkflow.id);
        }
    }

    render() {
        const { history, selectedWorkflow } = this.props;
        const { openAddModal } = this.state;
        const { nodes = [] } = selectedWorkflow || {};
        const allCompleted = nodes.every(({status}) => status === 'complete');
        return (
            <Fragment>
                <Header {...{
                    history
                }} />
                <Form inline onSubmit={(e) => this.addEditWorkFlow(e)}>
                    <Navbar bg="light" expand="lg" className="w-100">
                        <Form.Group controlId='title'>
                            <InputGroup>
                                <FormControl
                                    placeholder="WORK FLOW NAME"
                                    aria-label="Work flow name"
                                    aria-describedby="basic-addon1"
                                    defaultValue={selectedWorkflow ? selectedWorkflow.title : ''}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="d-flex align-item-center">
                                <Button disabled={!selectedWorkflow || !allCompleted} className="ml-1 mt-2 d-flex align-items-center justify-content-between" style={{
                                    maxWidth: 150,
                                    backgroundColor: 'purple',
                                    opacity: (!selectedWorkflow || !allCompleted) ? '50%' : 1
                                }} variant="secondary" type='button' onClick={() => this.reArrangeNodes()}>
                                    <FaRandom className="mr-1" /> Shuffle</Button>
                                <Button disabled={!selectedWorkflow} className="ml-1 mt-2 d-flex align-items-center justify-content-between" style={{
                                    maxWidth: 150
                                }} variant="danger" type='button' onClick={() => this.deleteWorkFlow()}>
                                    <FaTrash className="mr-1" /> Delete</Button>
                                <Button disabled={!selectedWorkflow} className="ml-1 mt-2 d-flex align-items-center justify-content-between" style={{
                                    maxWidth: 150
                                }} variant="success" type='button' onClick={() => this.openAddModal(true)}>
                                    <FaPlus className="mr-1" /> Add Node</Button>
                                <Button className="ml-1 mt-2 d-flex align-items-center justify-content-between" style={{
                                    maxWidth: 150
                                }} variant="primary" type='submit'>
                                    <FaFile className="mr-1" />
                                    {selectedWorkflow ? 'Update' : 'Save'}</Button>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </Form>
                <div className="pt-1 d-flex">
                    <Row className="w-100 m-0">
                        {nodes.map(({ title, description, status, id }) => (<Col xs={12} md={3} key={id}>
                            <Card className="mt-2">
                                <FaCheckCircle size="30" style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    right: -15,
                                    top: -15,
                                    overflow: 'visible',
                                    color: status === 'pending' ? '#6c757d' : status === 'inprogress' ? '#007bff' : '#28a745'
                                }} onClick={() => this.updateNode(status, id)} />
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                        {description}{status}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </div>
                <Modal show={openAddModal} onHide={() => this.openAddModal(false)}>
                    <Form onSubmit={(e) => this.addNode(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Node</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId='title'>
                                <InputGroup>
                                    <FormControl
                                        placeholder="WORK FLOW NAME"
                                        aria-label="Work flow name"
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <InputGroup>
                                    <FormControl
                                        placeholder="WORK FLOW NAME"
                                        aria-label="Work flow name"
                                        aria-describedby="basic-addon1"
                                        as="textarea"
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.openAddModal(false)}>
                                Close
                        </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNode: (node) => dispatch(addNode(node)),
    editNode: (node) => dispatch(editNode(node)),
    addWorkFlow: (workflow) => dispatch(addWorkFlow(workflow)),
    editWorKFLow: (workflow) => dispatch(editWorKFLow(workflow)),
    deleteWorkFlow: (workflow) => dispatch(deleteWorkFlow(workflow)),
    reArrangeNodes: (workflow) => dispatch(reArrangeNodes(workflow)),
})


const mapStateToProps = (store) => ({
    nodes: store.nodes.nodes,
    selectedWorkflow: store.nodes.selectedWorkflow
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkFLowPage);
import { ADD_NODE, EDIT_NODE, ADD_WORKFLOW, EDIT_WORKFLOW, SELECTED_WORKFLOW, DELETE_WORKFLOW, RE_ARRANGE_NODES} from '../constant';
export function addNode(node) {
    return {
        type: ADD_NODE,
        node
    }
}

export function editNode({
    nodeId, node, status, workFlowId
}) {
    return {
        type: EDIT_NODE,
        node,
        nodeId,
        status,
        workFlowId
    }
}

export function addWorkFlow(workflow) {
    return {
        type: ADD_WORKFLOW,
        workflow
    }
}

export function editWorKFLow({
    workFlowId, title, status
}) {
    return {
        type: EDIT_WORKFLOW,
        workFlowId,
        title,
        status
    }
}

export function deleteWorkFlow({
    workFlowId
}) {
    return {
        type: DELETE_WORKFLOW,
        workFlowId,
    }
}


export function selectedWorkflow(workFlowId) {
    return {
        type: SELECTED_WORKFLOW,
        workFlowId
    }
}


export function reArrangeNodes(workFlowId) {
    return {
        type: RE_ARRANGE_NODES,
        workFlowId
    }
}
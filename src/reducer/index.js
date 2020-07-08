import { ADD_NODE, EDIT_NODE, ADD_WORKFLOW, DELETE_WORKFLOW, EDIT_WORKFLOW, SELECTED_WORKFLOW, RE_ARRANGE_NODES } from '../constant';
import { combineReducers } from 'redux';

const nodes = (state = {
    workflows: {
    },
    selectedWorkflow: null
}, action) => {
    let workflows = { ...state.workflows };
    let selectedWorkflow = null;
    switch (action.type) {
        case ADD_NODE:
            workflows[action.node.workFlowId].nodes.push(action.node);
            workflows[action.node.workFlowId].status = 'pending';
            return {
                ...state,
                ...{
                    workflows
                }
            }
        case ADD_WORKFLOW:
            workflows[action.workflow.id] = action.workflow;
            workflows[action.workflow.id].nodes = [];
            selectedWorkflow = { ...action.workflow };
            return {
                ...state,
                ...{
                    workflows,
                    selectedWorkflow
                }
            }
        case EDIT_NODE:
            if (typeof action.nodeId === 'number') {
                const findNodeIndex = workflows[action.workFlowId].nodes.findIndex(({ id }) => id === action.nodeId);
                workflows[action.workFlowId].nodes[findNodeIndex].status = action.status;
                workflows[action.workFlowId].status = 'pending';
                selectedWorkflow = { ...workflows[action.workFlowId] };
            }

            return {
                ...state,
                ...{
                    workflows,
                    selectedWorkflow
                }
            }
        case EDIT_WORKFLOW:
            if (typeof action.workFlowId === 'number') {
                workflows[action.workFlowId].title = action.title || workflows[action.workFlowId].title;
                workflows[action.workFlowId].status = action.status || workflows[action.workFlowId].status;
                selectedWorkflow = { ...workflows[action.workFlowId] };
            }
            return {
                ...state,
                ...{
                    workflows,
                    selectedWorkflow
                }
            }
        case DELETE_WORKFLOW:
            if (typeof action.workFlowId === 'number') {
                delete workflows[action.workFlowId];
            }
            return {
                ...state,
                ...{
                    workflows,
                    selectedWorkflow: null
                }
            }
        case SELECTED_WORKFLOW:
            if (typeof action.workFlowId === 'number') {
                selectedWorkflow = { ...workflows[action.workFlowId] };
            } else {
                selectedWorkflow = null;
            }
            return {
                ...state,
                ...{
                    selectedWorkflow
                }
            }

        case RE_ARRANGE_NODES:
            if (typeof action.workFlowId === 'number') {
                console.log( workflows[action.workFlowId].nodes, action.workFlowId)
                for (let i = workflows[action.workFlowId].nodes.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    let temp = workflows[action.workFlowId].nodes[i];
                    workflows[action.workFlowId].nodes[i] = workflows[action.workFlowId].nodes[j];
                    workflows[action.workFlowId].nodes[j] = temp;
                }
                selectedWorkflow = { ...workflows[action.workFlowId] };
            }
            return {
                ...state,
                ...{
                    workflows,
                    selectedWorkflow
                }
            }
        default:
            return state
    }
}


export default combineReducers({
    nodes
})
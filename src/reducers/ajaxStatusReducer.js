import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type){
	return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
	switch (action.type) {
		case types.BEGIN_AJAX_CALL:
			state++;
			break;
		case types.END_AJAX_CALL:
			state--;
			break;
		default:
			if(actionTypeEndsInSuccess(action.type)){
				state--;
			}
	}
	
	return state;
}

import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function loadCoursesSuccess(courses){
	return {
		type: types.LOAD_COURSES_SUCCESS,
		courses: courses
	};
}

export function updateCourseSuccess(course){
	return {
		type: types.UPDATE_COURSE_SUCCESS,
		course: course
	};
}
export function saveCourseSuccess(course){
	return {
		type: types.CREATE_COURSE_SUCCESS,
		course: course
	};
}

export function loadCourses(){
	return function (dispatch){
		dispatch(beginAjaxCall());
		return courseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error => {
			throw (error);
		});
	};
}

export function saveCourse(course){
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(course).then(savedCourse => {
			if(course.id){
				dispatch(updateCourseSuccess(savedCourse));
			}else{
				dispatch(saveCourseSuccess(savedCourse));
			}
		}).catch(error => {
			dispatch(endAjaxCall(error));
			throw (error);
		});
	};
}

import expect from 'expect';
import * as courseActions from 'actions/courseActions';
import * as types from 'actions/actionTypes';

describe("Course Actions", () => {
	describe("saveCourseSuccess", () => {
		it('Should return a CREATE_COURSE_SUCCESS actions', () => {
			const course = {id: 'clean-code', title: 'Clean Code'};
			const expectedAction = {
				type: types.CREATE_COURSE_SUCCESS,
				course: course
			};

			const action = courseActions.saveCourseSuccess(course);

			expect(action).toEqual(expectedAction);
		});
	});
});

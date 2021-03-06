import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from 'components/course/CourseForm';

function setup(saving){
	const props = {
		course: {},
		loading: saving,
		errors: {},
		onSave: () => {},
		onChange: () => {}
	};

	return shallow(<CourseForm {...props} />);
}

describe("CourseForm tests", () => {
	it('Renders form and h1', () => {
		const wrapper = setup(false);
		expect(wrapper.find('form').length).toBe(1);
		expect(wrapper.find('h1').text()).toEqual('Manage Course');
	});

	it("'Save button' is labeled 'Save' when not saving", () => {
		const wrapper = setup(false);
		expect(wrapper.find('input').props().value).toBe('Save');
	});

	it("'Save button' is labeled 'Saving...' when saving", () => {
		const wrapper = setup(true);
		expect(wrapper.find('input').props().value).toBe('Saving...');
	});
});

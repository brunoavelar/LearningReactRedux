import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from 'actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from 'selectors';

export class ManageCoursePage extends React.Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			course: Object.assign({}, props.course),
			errors: {}
		};

		this.updateCourseState = this.updateCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.course.id != nextProps.course.id){
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	updateCourseState(event){
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	courseFormIsValid(){
		let formIsValid = true;
		let errors = {};

		if(this.state.course.title.length < 5){
			errors.title = 'Title must be at least 5 characters';
			formIsValid = false;
		}

		this.setState({errors: errors});
		return formIsValid;
	}

	saveCourse(event){
		event.preventDefault();

		if(!this.courseFormIsValid())
			return;

		this.props.actions.saveCourse(this.state.course)
			.then(() => this.redirect())
			.catch(error =>
				toastr.error(error)
			);
	}

	redirect(){
		toastr.success('Course saved');
		this.context.router.push('/courses');
	}

	render() {
		return (
			<CourseForm
				allAuthors={this.props.authors}
				onChange={this.updateCourseState}
				onSave={this.saveCourse}
				course={this.state.course}
				loading={this.props.saving}
				errors={this.state.errors}
			/>
		);
	}
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	saving: PropTypes.bool.isRequired
};

ManageCoursePage.contextTypes = {
	router: PropTypes.object
};

function getCourseById(courses, courseId) {
	const coursesFiltered = courses.filter(course => course.id == courseId);
	let returnCourse;

	if(coursesFiltered.length > 0)
		returnCourse = courses[0];
	else
		returnCourse = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

	return returnCourse;
}

function mapStateToProps(state, ownProps){
	const courseId = ownProps.params.id; //From the path /course/:id
	const course = getCourseById(state.courses, courseId);

	return{
		course: course,
		authors: authorsFormattedForDropdown(state.authors),
		saving: state.ajaxCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

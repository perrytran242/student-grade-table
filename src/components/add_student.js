import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addStudent } from '../actions';
import { getStudentList } from '../actions';


class AddStudent extends Component {

    addStudent = async (values) => {
        await this.props.addStudent(values.name, values.grade, values.course);
        this.props.getStudentList();
        this.props.reset();

    }    
    renderInput( { input, type, label, meta: { touched, error }} ) {
        const faUser = {
            position: 'relative',
            height: '38px',
            width: '40px',
            top: '4px',
        }

        const faBook = {
            position: 'relative',
            height: '38px',
            width: '40px',
            top: '4px'
        }

        const faGraduation = {
            position: 'relative',
            height: '38px',
            width: '40px',
            top: '4px'
        }

        const checkLabelInput = () => {
            if ( label === "Student Name") {
                return  <span style={faUser} className="input-group-text"><i className="fas fa-user"></i></span>
            } else if ( label === "Student Course") {
                return  <span style={faBook} className="input-group-text"><i className="fas fa-book-open"></i></span>
            } else if ( label === "Student Grade") {
                return <span style={faGraduation} className="input-group-text"><i className="fas fa-graduation-cap"></i></span>
            }
        }
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  {checkLabelInput()}
                </div> 
                 <input placeholder={ label } className="d-block my-1 form-control" autoComplete="off" {...input} type={ type || "text"}/>    
                 <p>{ touched && error }</p>
            </div>

        )
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="form-group col-lg-4" >
                <h4>Add Student or Update</h4>
                <Field label="Student Name" name="name" component={this.renderInput}/>
                <Field label="Student Course" name="course" component={this.renderInput}/>
                <Field label="Student Grade" name="grade" component={this.renderInput} type="number"/>
                <button onClick={handleSubmit(this.addStudent)} type="button" className="mx-2 btn btn-success">Add</button>
                <button onClick={() => this.props.getStudentList} type="button" className="mx-2 btn btn-info">Get Data From Server</button>
            </form>
        )
    }
}   

function validate(values) {
    const { name, course, grade } = values;
    const errors = {};

    if (!name) {
        errors.name = 'Please enter name'
    }
    if (!course) {
        errors.course = 'Please enter course'
    }
    if (!grade) {
       errors.grade = 'Please enter a grade' 
    }
    return errors
}


AddStudent = reduxForm({
    form: 'add-student',
    validate: validate,
})(AddStudent);

export default connect(null, {
    addStudent: addStudent,
    getStudentList: getStudentList
})(AddStudent);
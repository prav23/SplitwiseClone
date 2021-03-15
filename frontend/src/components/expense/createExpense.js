import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createExpense} from '../../actions/expenseActions';

class CreateExpense extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      amount:'',
      description: '',
      expense_date: '',
      user_id: '',
      group_id: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    
    const expenseData = {
      amount: this.state.amount,
      description: this.state.description,
      expense_date: this.state.expense_date,
      user_id: this.state.user_id,
      group_id: this.state.group_id
    };
    
    this.props.createExpense(expenseData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    
    const { errors } = this.state;

    return (
      <div className="create-expense">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Add Expense</h2>
              
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Expense Amount"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.onChange}
                  error={errors.amount}
                  info="Enter expense amount"
                />
                <SelectListGroup
                  placeholder="description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Please add description"
                />
                <SelectListGroup
                  placeholder="enter expense date"
                  name="expense_date"
                  value={this.state.expense_date}
                  onChange={this.onChange}
                  error={errors.expense_date}
                  info="Please enter expense_date"
                />
                <SelectListGroup
                  placeholder="user_id"
                  name="user_id"
                  value={this.state.timezone}
                  onChange={this.onChange}
                  error={errors.user_id}
                  info="Please enter user_id"
                />
                <TextFieldGroup
                  placeholder="group_id"
                  name="group_id"
                  value={this.state.group_id}
                  onChange={this.onChange}
                  error={errors.group_id}
                  info="Enter your group_id"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


CreateExpense.propTypes = {
  expense: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense,
  errors: state.errors
});

export default connect(mapStateToProps,{createExpense})(withRouter(CreateExpense));
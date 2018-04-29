import React, { Component } from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export class EditExpensePage extends Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onClick = () => {
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onClick}>Remove Expense</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const expense = state.expenses.find(
    expense => expense.id === props.match.params.id
  );
  return { expense };
};

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  removeExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

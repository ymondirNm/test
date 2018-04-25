import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onClick = () => {
        this.props.removeExpense(this.props.expense.id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>

                <h1>Edit Expanse</h1>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />

                <button onClick={this.onClick}>Remove</button>
            </div>
        )
    }

}


const mapStateToProps = (state, props) => {
    const expense = state.expenses.find((expense) => expense.id === props.match.params.id);
    if (expense) {
        return { expense };
    } else {
        props.history.push('/notFound')
        return {}
    }
    /*   return {
           expense: state.expenses.find((expense) => expense.id === props.match.params.id)
       }*/
};

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (id) => dispatch(removeExpense({ id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
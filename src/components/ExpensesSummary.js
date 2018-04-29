import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { Link } from "react-router-dom";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">
        Viewing <span>{expenseCount}</span>{" "}
        {expenseCount === 1 ? "expense" : "expenses"} totalling{" "}
        <span>{numeral(expensesTotal / 100).format("$0,0.00")}</span>
      </h1>
      <div className="page-header__actions">
        <Link className="button" to="/create">
          Create Expense
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const selectedExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: selectedExpenses.length,
    expensesTotal: getExpensesTotal(selectedExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

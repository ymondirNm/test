import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div>
    <h1>
      Viewing {expenseCount} {expenseCount === 1 ? "expense" : "expenses"}{" "}
      totalling {numeral(expensesTotal/100).format("$0,0.00")}
    </h1>
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

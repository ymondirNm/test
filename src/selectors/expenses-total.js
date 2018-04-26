export default (expenses = [{ amount: 0 }]) => {
  return expenses.map(expense => expense.amount).reduce((a, b) => a + b, 0);
};

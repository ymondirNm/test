import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should 0 if no expenses", () => {
  const result = getExpensesTotal([]);
  expect(result).toEqual(0);
});

test("should correctly add up a single expense", () => {
  const result = getExpensesTotal([expenses[0]]);

  expect(result).toBe(expenses[0].amount);
});

test("should correctly add up a multiple expenses", () => {
  const result = getExpensesTotal(expenses);
  const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;
  expect(result).toBe(total);
});

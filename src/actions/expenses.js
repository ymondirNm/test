import uuid from "uuid";
import database from "../firebase/firebase";

//ADD EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

//REMOVE EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startAddExpense = (expanseData = []) => {
  return dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expanseData;
    const expense = { description, note, amount, createdAt };
    return database
      .ref("expenses")
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});
// export const startSetExpenses;
export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref("expenses")
      .once("value")
      .then(snapshot => {
        const expensesData = [];
        snapshot.forEach(child => {
          expensesData.push({
            id: child.key,
            ...child.val()
          });
        });

        dispatch(setExpenses(expensesData));
      });
  };
};

// export const startSetExpenses;
export const startRemoveExpense = id => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .set(null)
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};
// export const startSetExpenses;
export const startEditExpense = (id, updates) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

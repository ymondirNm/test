import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startRemoveExpense,
  startEditExpense,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const uid = 'thisistestuid';
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = [];
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", {
    description: "bill",
    amount: 100,
    createdAt: 1000,
    note: "note"
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { description: "bill", amount: 100, createdAt: 1000, note: "note" }
  });
});

test("should setup add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should  add expense to db and store", done => {
  const store = createMockStore({auth:{uid}});
  const expenseData = {
    description: "bill",
    amount: 100,
    createdAt: 1000,
    note: "note"
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should  add expense to db and store with defaults", done => {
  const store = createMockStore({auth:{uid}});
  const expenseData = {
    description: "",
    amount: 0,
    createdAt: 0,
    note: ""
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should  fetch expenses from firebase", done => {
  const store = createMockStore({auth:{uid}});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

test("should  remove expenses from firebase", done => {
  const store = createMockStore({auth:{uid}});

  store
    .dispatch(startRemoveExpense(expenses[0].id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
      });
      return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should  edit expenses in firebase", done => {
  const store = createMockStore({auth:{uid}});

  store
    .dispatch(startEditExpense(expenses[0].id, { amount: 1000 }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id: expenses[0].id,
        updates: { amount: 1000 }
      });
      return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once("value");
    })
    .then(snapshot => {
      const exp = snapshot.val();
      expect(exp.amount).toBe(1000);
      
      done();
    });
});

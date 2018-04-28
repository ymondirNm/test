import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

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

test("should  add expense to db and store", (done) => {
  const store = createMockStore({});
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

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should  add expense to db and store with defaults", (done) => {
    const store = createMockStore({});
    const expenseData = {
      description: '',
      amount: 0,
      createdAt: 0,
      note: ''
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
  
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
});

// test('should setup add expense action object with default values', () => {
//     const expenseData = { description  :'', note : '', amount: 0, createdAt : 0  };
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }
//     });
// });

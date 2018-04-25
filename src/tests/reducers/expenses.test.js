import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

//init
test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([])
})

//remove
test('should remove expense by id', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: expenses[1].id });
    expect(state).toEqual([expenses[0], expenses[2]])
})
test('should not remove expense if id not found', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '-1' });
    expect(state).toEqual(expenses)
})

//add
test('should add expense to state', () => {
    const expense = {
        id: '4',
        description: 'Water bill',
        amount: 27000,
        createdAt: 0,
        note: ''
    };
    const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense });
    expect(state).toEqual([...expenses, expense])
})

//edit
test('should edit expense ', () => {
    const amount = 50000;
    const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', updates: { amount }, id: expenses[0].id });
    expect(state[0].amount).toBe(amount)
})

test('should not edit expense if expense not found', () => {
    const updates = {
        description: 'Water and electricity bill',
        amount: 50000, 
    };
    const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', updates, id: '-1' });
    expect(state).toEqual(expenses)
})

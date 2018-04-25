import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';



const store = configureStore();
/*
const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(state);
});

store.dispatch(addExpense({ description: 'Water bill', amount: 27000, createdAt: -21000 }));
store.dispatch(addExpense({ description: 'Electricity bill', amount: 45000, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 80000, createdAt: -1000 }));
*/

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)


ReactDOM.render(jsx, document.getElementById('app'));

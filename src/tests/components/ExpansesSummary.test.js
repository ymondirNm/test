import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import getExpensesTotal from "../../selectors/expenses-total";


test('should render ExpensesSummary with expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={12536998}/>);
    expect(wrapper).toMatchSnapshot();
});


import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: "",
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state).toEqual({
        text: "",
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to date', () => {
    const currentState = { 
        text: "",
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };
    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date')
})


test('should set start date filter', () => {
    const testDate = moment().startOf('month').add(4, 'days');
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', date: testDate });
    expect(state.startDate).toEqual(testDate)
})


test('should set end date filter', () => {
    const testDate = moment().endOf('month').add(4, 'days');
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', date: testDate });
    expect(state.endDate).toEqual(testDate)
})

test('should set text filter', () => {
    const testText = 'fffe';
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: testText });
    expect(state.text).toEqual(testText)
})
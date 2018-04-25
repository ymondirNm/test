import moment from 'moment';


export default [
    {
        id: '1',
        description: 'Water bill',
        amount: 27000,
        createdAt: 0,
        note: ''
    }, {
        id: '2',
        description: 'Rent bill',
        amount: 125000,
        createdAt: moment(0).subtract(4, 'days').valueOf(),
        note: ''
    }, {
        id: '3',
        description: 'Gaz bill',
        amount: 4500,
        createdAt: moment(0).add(4, 'days').valueOf(),
        note: ''
    }
] 
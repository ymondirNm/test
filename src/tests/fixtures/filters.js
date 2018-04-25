import moment from 'moment';

const filters = {
    text: "",
    sortBy: 'date',
    startDate: undefined,
    uendDate: undefined
}

const altFilters = {
    text: "bills",
    sortBy: 'amount',
    startDate: moment(0),
    uendDate: moment(0).add(3,'days')
}

export {filters, altFilters}; 
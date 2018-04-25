// Object

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher:{
        name: 'Penguin'
    }
};

const {name: publisherName = 'self-published'} = book.publisher;

console.log(publisherName);

// Array

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [name = 'product', , mediumPrice = '$2.00'] = item;

console.log(`A medium ${name} costs ${mediumPrice}`)
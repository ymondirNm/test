const add = (a,b) => a+b;
const greeting = (name = 'Anonymous')=>`Hello ${name}!`

test('add 2 nbr',()=>{
    expect(add(3,2)).toBe(5);
})

test('hello',()=>{
    expect(greeting('youn')).toBe(`Hello youn!`);
})

test('hello vide',()=>{
    expect(greeting()).toBe(`Hello Anonymous!`);
})
// let x = 'outer';
//
//
// function test( arg ) {
    // if(arg) {
    //     x = 'i';
    //     let x = 'inner';
    //     return x;
    // }

    // if(arg) {
    //     let x = 'inner';
    //     return x;
    // }

    // for (let i = 0; i < 10; i++) {
    //     console.log(i);
    // }

//     console.log(i + ' outer');
//
//     return x;
// }
//
// console.log(test(true)); ///


// (()=>{for(var i = 0; i < 10; i ++) {
//     console.log('IS: ' + i);
// }
//     console.log(i); })();
//
//
// (()=>{for(let i = 0; i < 10; i ++) {
//     console.log('IS: ' + i);
// }
//     console.log(i); })();


function Dog(name) {
    this.name = name;
}

Dog.prototype.getName = () => this.name;

Dog.prototype.sayHi = function () {
    setTimeout( () => {
        console.log('Bark' + this.name);
    }, 1000);
};

let dog = new Dog('Okey');


console.log(dog.getName());




// dog.sayHi();


let getFinalPrice = (price, tax = 0.7) => price + price * tax;

console.log(getFinalPrice(500, 0));

let str = `
    <div>
`;


function f(a, b, ...arr) {

}


function foo(a, b, x, y, z) {
    console.log(x, y, z);
}

let arr = ['arr 1', 'arr 2', 'arr 3'];
foo(1, 2, ...arr);


let obj = {
    symbol: {
        name: 'asd',
        str: {
            a: 'a',
            b: 'b'
        }
    },
    price: 17
};

let { symbol , price } = obj;

let s = obj.symbol;
let p = obj.price;

console.log(price);

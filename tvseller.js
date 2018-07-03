/*-----JavaScript Decorator Patterns------*/
let tvmaker = function(obj, stock){
	obj.stock=stock;
	obj.sell=sell;
	obj.buy=buy;
	obj.returns=buy;
	obj.isColor=true;
	return obj;
}

let buy = function([num=1]=[]){
	console.log(`Current stock is ${this.stock+num}.`);
	this.stock = this.stock+num;
}

let sell = function([num=1]=[]){
	if(num<=this.stock){
	console.log(`Sold ${num} tv(s). Current stock is ${this.stock-num}`);
	this.stock = this.stock-num;
	}

	else {
	console.log(`Not enough tv(s) in stock. Try ${this.stock} or less.`)
	}
}

let onida = tvmaker({},10);

/*------------------------------------------Part 2 - moved buy, sell function expressions into tvmaker
So the buy, sell function expressions are not in global scope anymore -
they are the part of the tvmaker object decorator now*/

let tvmaker = function(obj, stock){

	obj.stock=stock;

	obj.sell=function([num=1]=[]){
		if(num<=this.stock){
		console.log(`Sold ${num} tv(s). Current stock is ${this.stock-num}`);
		this.stock = this.stock-num;
		}

		else {
		console.log(`Not enough tv(s) in stock. Try ${this.stock} or less.`)
		}
	};

	obj.buy=buy;
	obj.returns=buy;
	obj.isColor=true;

	function buy([num=1]=[]){
	console.log(`Current stock is ${this.stock+num}.`);
	this.stock = this.stock+num;
	}

	return obj;
}

let onida = tvmaker({},10);



/*------------------------------------------ Part 3 converted the this keyword to obj as each object
will be an instance of tvmaker object and obj refers to that newly created object - So we dont need
to reference it with this keyword anymore*/


let tvmaker = function(obj, stock){

	obj.stock=stock;

	obj.sell=function([num=1]=[]){
		if(num<=obj.stock){
		console.log(`Sold ${num} tv(s). Current stock is ${obj.stock-num}`);
		obj.stock = obj.stock-num;
		}

		else {
		console.log(`Not enough tv(s) in stock. Try ${obj.stock} or less.`)
		}
	};

	obj.buy=buy;
	obj.returns=buy;
	obj.isColor=true;

	function buy([num=1]=[]){
	console.log(`Current stock is ${obj.stock+num}.`);
	obj.stock = obj.stock+num;
	}

	return obj;
}

let onida = tvmaker({},10);

/*------------------------------------------ Part 4 - Changed the decorator function pattern TO Constructor function.
Moved all the methods to the Tvmaker prototype. So that all the instances created by Tvmaker share the methods
from the Tvmaker's prototype - So those moethods/functions are on shared memory*/


function Tvmaker (stock){
	this.name=this.toString();
	this.stock=stock;
	this.isColor=true;
}

Tvmaker.prototype ={
						sell([num=1]=[]){
									if(num<=this.stock){
									console.log(`Sold ${num} tv(s). Current stock is ${this.stock-num}`);
									this.stock = this.stock-num;
									}

									else {
									console.log(`Not enough tv(s) in stock. Try ${this.stock} or less.`)
									}
								},

						buy: buyOrReturn,
						returns: buyOrReturn,
}

function buyOrReturn ([num=1]=[]){
	console.log(`Current stock is ${this.stock+num}.`);
	this.stock = this.stock+num;
}


let onida = new Tvmaker(10);
let samsung = new Tvmaker(5);


/*------------------------------------------ Part 5 - Converted Constructor function TO Class*/


class Tvmaker {
	//The below constructor method is the Constructor function - function Tvmaker(){...}
		constructor(stock,tvname){
		this.name=tvname.toUpperCase();
		this.stock=stock;
		this.isColor=true;
		}

	//the below methods end up on Tvmaker.prototype
		sell([num=1]=[]){
			if(num<=this.stock){
			console.log(`Sold ${num} ${this.name} tv(s). Current stock is ${this.stock-num}`);
			this.stock = this.stock-num;
			}

			else {
			console.log(`Not enough ${this.name} tv(s) in stock. Try ${this.stock} or less.`)
			}
		}

		buy(num){
			buyOrReturn.call(this, num);
		}

		returns(num){
			buyOrReturn.call(this, num);
		}

}

function buyOrReturn ([num=1]=[]){
	console.log(`Current stock is ${this.stock+num}.`);
	this.stock = this.stock+num;
}


let phillips = new Tvmaker(10,"phillips");
let samsung = new Tvmaker(5,"samsung");


// Below - Class, extends, super

class People {
	
	constructor(name,age){
		this.name=name;
		this.age=age;
	}

	greet(){
		console.log(`Hello! My name is ${this.name}, I am ${this.age}.`);
	}

}

class Worker extends People{
	constructor(isWorker,name,age){
		super(name,age);
		this.isWorker=isWorker;
	}

	greet(){
		super.greet();
	}

	declareWork(){
		if(this.isWorker){
			console.log("Yes, I am a Worker");
		}
		else {
			console.log("No, I am a Student");
		}
	}
}

	/*keyword static is used so that the method can be directly accessed on the object.
	Instead of Worker.prototype.declareWork() you can access it as Worker.declareWork()

	class Worker extends People{

		constructor(isWorker,name,age){
			super(name,age);
			this.isWorker=isWorker;
		}

		greet(){
			super.greet();
		}

		static declareWork(){
			if(this.isWorker){
				console.log("Yes, I am a Worker");
			}
			else {
				console.log("No, I am a Student");
			}
		}
	}

	*/


class Vehicle {
	constructor(color = 'blue', wheels = 4, horn = 'beep beep') {
		this.color = color;
		this.wheels = wheels;
		this.horn = horn;
	}

	honkHorn() {
		console.log(this.horn);
	}
}


// your code goes here
//the keyword super must be used before using the keyword this
	class Bicycle extends Vehicle {
	    constructor(color = 'blue', wheels = 2, horn = "honk honk", seats=2){
	        super(color,wheels,horn);
	        this.seats = seats;
	    }
	}

const myVehicle = new Vehicle();
const myBike = new Bicycle();

myVehicle.honkHorn(); // beep beep
myBike.honkHorn(); // honk honk








class Tablet {
	constructor(name = "iPad Pro", os = "IOS"){
		this.name=name;
		this.os=os;
	}

	giveDetails(){
		console.log(`Your device is ${this.name} running on ${this.os}.`);
	}
}

class Phone extends Tablet {
	constructor(name = "Google Pixel", os = "Android", message = "Hey! How are you? :D"){
		super(name,os); //the keyword super should be called before using the keyword this.
		this.msg=message; //assigned a new method with the name msg to Phone class.
	}

	giveDetails(){
		super.giveDetails(); //supered giveDetails method from superClass - Tablet
	}

	message(){
		console.log(this.msg);
	}

	call(){
		console.log("Calling...");
	}
}

const nokia = new Phone("Nokia", "Nokia Asha Platform", "Hey! I'm messaging from my new Nokia phone");








class Tablet {
	constructor(device="my Tablet", size="8 inches"){
		this.device=device;
		this.size=size;
	}

	printDetails(){
		console.log(`Your device is ${this.device} size ${size}.`);
	}
}


class Phone extends Tablet {
	constructor(device="my Phone", size="5.6 inches",num="732-789-0005",msg="Hey! hw r u?"){
		super(device,size);
		this.num=num;
		this.msg=msg;
	}

	printDetails(){
		super.printDetails();
	}

	call(){
		console.log("Calling...");
	}

	sendMsg(){
		console.log(`${this.msg}`);
	}
}



/* -----------------------------------Symbols------------------------------------- */
//Symbols are an excellent way to write multiple properties with the same name.

let furniture = {
[Symbol('tables')]:{number:2, type: "metal", color: "silver"},
[Symbol('tables')]:{number:2, type: "wooden", color: "black"},
[Symbol('chairs')]:{number:8, type: "metal", color: "silver"},
[Symbol('chairs')]:{number:4, type: "wooden", color: "black"},
};


//Iterable and Iterator Protocols
const nums = [1,2,3,4,5,5,4,3,2,1];
for (const num of nums){
	console.log(num*2);
}

const arrayIterator = nums[Symbol.iterator]();

//Runs one extra time than the total nums.length
for (let i=0; i<=nums.length; ++i){
	console.log(arrayIterator.next());
}



//sets are arrays with Unique values only
let someArray = [1,1,2,3,"apple","apple"] //This is an array. Repeated Values are accepted.

let someSet = new Set([1,2,3,"apple"]) //This is a Set. Repeated values are NOT accepted.

someSet.add("mango");
console.log(someSet);//logs Set(5) {1, 2, 3, "apple", "mango"}

//to add multiple values to the set at once - someSet.add("tomatoes").add(5).add(9);

someSet.delete("apple");//logs true
console.log(someSet);//logs Set(4) {1, 2, 3, "mango"}

console.log(someSet.size); //logs 4
//primitives in javascript are numbers, strings, boolean, undefined, null and Symbols

console.log(someSet.has("mango")); //logs true

//to add multiple values at once - 

console.log(someSet.values()); //logs all the values of the variable someSet. logs SetIterator {1, 2, 3, "mango"}



const colors = new Set(["violet","black","green","yellow","orange","red"]);

console.log(colors.values());//logs SetIterator {"violet","black","green","yellow","orange","red"}

const iterator = colors.values();
iterator.next(); //logs {value: "violet", done: false}
iterator.next(); //logs {value: "black", done: false}
iterator.next(); //logs {value: "green", done: false}
iterator.next(); //logs {value: "yellow", done: false}
iterator.next(); //logs {value: "orange", done: false}
iterator.next(); //logs {value: "red", done: false}
iterator.next(); //logs {value: undefined, done: true}

colors.clear(); //clear() method clears all the items in the Set
colors; //logs Set(0) {}



let student1 = { name: 'James', age: 26, gender: 'male' };
let student2 = { name: 'Julia', age: 27, gender: 'female' };
let student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);

/*Logs WeakSet {Object {name: 'Julia', age: 27, gender: 'female'},
Object {name: 'Richard', age: 31, gender: 'male'}, Object {name: 'James', age: 26, gender: 'male'}} */

roster.add('Amanda'); //ERROR - because WeakSet(s) allow only Objects Not primitives.

student3 = null;
console.log(roster);
//Logs WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}}






// Maps are similar to Sets but Maps are more like Objects with key value pairs in them

let family = new Map();
console.log(family) //logs Map {} - because its currently empty

family.set('Pavan',{name: 'Pavan Kumar', age: 29, isMale: true});
family.set('Lakshmi',{name: 'Venkat Lakshmi', age: 50, isMale: false});

console.log(family) //logs Map(2) {"Pavan" => {…}, "Lakshmi" => {…}}

family.delete('Pavan'); //logs true as it is successfully deleted

console.log(family); //logs Map(1) {"Lakshmi" => {…}}

family.clear(); //clears all values in the variable - logs Map(0) {}


const fruit = Symbol('Apple');
const anotherFruit = Symbol('Apple');
console.log(fruit===anotherFruit); //false


// WeakMaps are similar to Maps but WeakMaps take an Object for a key and the object can be later set to null for garbage collection

const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver’s Travels', author: 'Jonathan Swift' };

let allBooks = new WeakMap();
books.set(book1, true);
books.set(book2, false);
books.set(book3, true);

console.log(allBooks);

/* Logs WeakMap {Object {title: 'Pride and Prejudice', author: 'Jane Austen'} => true,
Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false,
Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}
*/

//library.set('The Grapes of Wrath', false); ---> results in ERROR because you can only set an object as a key in WeakMap

book1 = null;
console.log(allBooks);
/* WeakMap {Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false,
Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}
*/
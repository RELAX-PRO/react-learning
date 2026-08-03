# ES6 Classes

JavaScript is not a traditional Object-Oriented language like Java or C#. Under the hood, JavaScript uses "Prototypal Inheritance". ES6 Classes are just "syntactic sugar"—a cleaner way to write prototype logic.

### Why learn Classes for React?
Modern React (post-2019) almost exclusively uses Functional Components. However, you MUST understand classes for two reasons:
1. **Legacy Codebases:** You will inevitably work on a project built before 2019 that uses Class Components (`class UserProfile extends React.Component`).
2. **Error Boundaries:** In React, catching unexpected UI crashes can currently *only* be done using a Class Component.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Constructors and Inheritance
*/

class Animal {
  // The constructor runs immediately when 'new' is called.
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// 'extends' allows Dog to inherit all properties and methods from Animal.
class Dog extends Animal {
  constructor(name, breed) {
    // You MUST call super() to trigger the parent class's constructor!
    super(name); 
    this.breed = breed;
  }
  
  // We can override the parent's speak method.
  speak() {
    console.log(`${this.name} barks!`);
  }
}

const dog = new Dog("Rex", "German Shepherd");
dog.speak();

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Static Methods and Private Fields
*/

class MathHelper {
  // Private field (starts with #). This cannot be accessed outside the class!
  #pi = 3.14159;

  // Static methods belong to the Class itself, NOT to instances of the class.
  static add(a, b) {
    return a + b;
  }

  getPi() {
    return this.#pi;
  }
}

// We call 'add' directly on the blueprint (the Class).
console.log("Static Math:", MathHelper.add(5, 5)); // 10

// We must create an instance to access non-static methods.
const helper = new MathHelper();
console.log("Accessing private field via method:", helper.getPi());

// console.log(helper.#pi); // THIS CRASHES! Private field is hidden.

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Losing 'this' in Class Methods
  
  This was the most infamous bug in early React development.
  If you pass a class method as a callback to an event listener, 
  it loses its connection to the class instance!
*/

class BrokenButton {
  constructor() {
    this.clicks = 0;
  }
  
  handleClick() {
    // If this method is attached to a UI button, 'this' becomes undefined!
    // this.clicks++; // CRASH! Cannot read properties of undefined.
  }
}

// THE FIX: Use an Arrow Function for the method. 
// Arrow functions automatically bind 'this' to the class instance!
class WorkingButton {
  constructor() {
    this.clicks = 0;
  }
  
  handleClick = () => {
    this.clicks++;
    console.log("Clicked:", this.clicks);
  }
}

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create a class 'Car' with a constructor that takes a 'brand' parameter.
  2. Add an arrow function method 'drive' that logs "Driving the [brand]".
  3. Instantiate the class and call the drive method.
*/

// Write your code below this line:
```

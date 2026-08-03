/*
  =========================================
  CLASSES AND PROTOTYPICAL INHERITANCE
  =========================================
  Classes in ES6 are essentially "syntactic sugar" over JavaScript's existing 
  prototype-based inheritance system. They do not introduce a new object-oriented 
  inheritance model. Under the hood, class methods are assigned to the 
  constructor's `.prototype` object, and instances share these methods via the 
  prototype chain.
*/

// --- Defining a Class ---
class Developer {
  // The constructor initializes instance properties when 'new Developer(...)' is called.
  constructor(name, primaryLanguage, experienceYears) {
    this.name = name; // `this` refers to the newly created instance
    this.primaryLanguage = primaryLanguage;
    this.experienceYears = experienceYears;
  }

  // Instance methods define behaviors for objects created from this class.
  // These are implicitly attached to `Developer.prototype`.
  introduceSelf() {
    return `Hi, I am ${this.name}, and I code in ${this.primaryLanguage}.`;
  }

  upgradeExperience() {
    this.experienceYears += 1;
    console.log(`${this.name}'s experience upgraded to ${this.experienceYears} years!`);
  }
}

// --- Instantiation ---
// Creating instances of the Developer class.
// The `new` keyword creates a new plain object, links its prototype, and calls the constructor with `this` bound to the object.
const dev1 = new Developer("Majed", "JavaScript", 3);
const dev2 = new Developer("Sara", "TypeScript", 5);

console.log(dev1.introduceSelf()); // Output: "Hi, I am Majed, and I code in JavaScript."
dev1.upgradeExperience();          // Output: "Majed's experience upgraded to 4 years!"


// --- Inheritance ---
/*
  The `extends` keyword links the prototype chain between two constructors.
  ReactDeveloper's prototype will inherit from Developer's prototype.
*/
// The 'extends' keyword allows a class to inherit properties and methods from another class.
class ReactDeveloper extends Developer {
  constructor(name, experienceYears, favoriteStateTool) {
    /* 
      super() calls the constructor of the parent class.
      In derived classes, `super()` must be called before accessing `this`, 
      because the parent class is responsible for initializing `this`.
    */
    super(name, "React/JS", experienceYears); 
    
    // Properties specific to the child class.
    this.favoriteStateTool = favoriteStateTool;
  }

  // A method specific to the child class.
  buildComponent(componentName) {
    console.log(`${this.name} is building <${componentName} /> using ${this.favoriteStateTool}!`);
  }

  // Method Overriding: Redefining a parent method in the child class.
  // This method intercepts the prototype lookup before reaching `Developer.prototype`.
  introduceSelf() {
    return `Hello world! I am a specialized React Engineer named ${this.name}.`;
  }
}

// Testing the inherited subclass.
const reactDev = new ReactDeveloper("Ali", 4, "Redux Toolkit"); // Instantiating the child class

console.log(reactDev.introduceSelf());      // Output: "Hello world! I am a specialized React Engineer named Ali."
reactDev.buildComponent("UserProfile");       // Output: "Ali is building <UserProfile /> using Redux Toolkit!"
reactDev.upgradeExperience();               // Output: "Ali's experience upgraded to 5 years!" // Uses inherited method

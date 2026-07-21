// 1. Defining the Blueprint (Class)
class Developer {
  // 2. The Constructor: Runs automatically when 'new Developer(...)' is called
  constructor(name, primaryLanguage, experienceYears) {
    this.name = name; // 'this' refers to the specific instance being created
    this.primaryLanguage = primaryLanguage;
    this.experienceYears = experienceYears;
  }

  // 3. Methods: Actions that objects created from this class can perform
  introduceSelf() {
    return `Hi, I am ${this.name}, and I code in ${this.primaryLanguage}.`;
  }

  upgradeExperience() {
    this.experienceYears += 1;
    console.log(`${this.name}'s experience upgraded to ${this.experienceYears} years!`);
  }
}

// ==========================================
// Creating Instances (Objects) from the Class
// ==========================================

// We use the 'new' keyword to instantiate real objects:
const dev1 = new Developer("Majed", "JavaScript", 3);
const dev2 = new Developer("Sara", "TypeScript", 5);

console.log(dev1.introduceSelf()); // Output: "Hi, I am Majed, and I code in JavaScript."
dev1.upgradeExperience();          // Output: "Majed's experience upgraded to 4 years!"


// ReactDeveloper inherits EVERYTHING from Developer using 'extends'
class ReactDeveloper extends Developer {
  constructor(name, experienceYears, favoriteStateTool) {
    // 1. CALLING THE PARENT CONSTRUCTOR USING super()
    // We pass 'name', set language hardcoded to "React/JS", and pass 'experienceYears'
    super(name, "React/JS", experienceYears); 
    
    // 2. Adding a new property specific ONLY to ReactDeveloper
    this.favoriteStateTool = favoriteStateTool;
  }

  // Adding a new method specific ONLY to ReactDeveloper
  buildComponent(componentName) {
    console.log(`${this.name} is building <${componentName} /> using ${this.favoriteStateTool}!`);
  }

  // Method Overriding: Re-defining a parent method to behave differently in the child!
  introduceSelf() {
    return `Hello world! I am a specialized React Engineer named ${this.name}.`;
  }
}

// Let's test our inherited subclass:
const reactDev = new ReactDeveloper("Ali", 4, "Redux Toolkit");

console.log(reactDev.introduceSelf());      // Output: "Hello world! I am a specialized React Engineer named Ali." (Overridden method!)
reactDev.buildComponent("UserProfile");       // Output: "Ali is building <UserProfile /> using Redux Toolkit!"
reactDev.upgradeExperience();               // Output: "Ali's experience upgraded to 5 years!" (Inherited from parent Developer class!)

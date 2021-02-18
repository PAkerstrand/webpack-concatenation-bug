import modA from "./module-a";
import modB from "./config";

const { testProp = "defaultValue" } = modB;

modA();
console.log(testProp);

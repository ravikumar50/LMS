
import { compose } from "redux";

function removeSpaces(string){
    return string.split(" ").join("");
}
function repeatString(string){
    return string.repeat(2);
}

function toUpperCase(string){
    return string.toUpperCase();
}
let string = "afdsfdsm fdsfds sfdsf";
console.log(toUpperCase(repeatString(removeSpaces(string))));

const composedFunction = compose(removeSpaces,repeatString,toUpperCase)
console.log(composedFunction(string));


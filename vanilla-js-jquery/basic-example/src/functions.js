import { numbers } from "./numbers";

export const makeFloat = value => {
    let returnValue = value.split("").filter(item => numbers.includes(item));
    if (returnValue[returnValue.length - 1] === ".") {
        returnValue.push("00");
    } else if (returnValue[returnValue.length - 2] === ".") {
        returnValue.push("0");
    }
    returnValue = returnValue.join("").replace(",", ".");

    if (!returnValue.includes(".") && returnValue !== "") {
        returnValue = returnValue + ".00";
    }
    return returnValue;
};

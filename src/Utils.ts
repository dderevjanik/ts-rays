/**
 * Repeat specific function several times
 * @param {number} count - how many times repeat function
 * @param {function} callback - function to repeat
 * @return {Array<T>} result of functions
 */
export const repeat = <T>(count: number, callback: (number) => T): Array<T> => {
    const arr: Array<T> = [];
    for (let i: number = 0; i < count; i++) {
        arr.push(callback(i));
    }
    return arr;
};

/**
 * Call function until some test falls
 * @param {function} callback - this function create output <T>, which will be tested
 * @param {function} test - test output data <T> of doFunction, if fails, then break
 * @param {function} processOutput - if test pass, then this function process output <T> of doFunction
 * @param {T} prev - callback will be fired first time with this data
 * @retun {Array<U>}
 */
export const doUntil = <T, U>(callback: (prev: T) => U, test: (U) => boolean, processOutput: (U) => T, prev: T): Array<U> => {
    const arr: Array<U> = [];
    let output: U = callback(prev);
    while(test(output)) {
        arr.push(output);
        output = callback(processOutput(output));
    }
    return arr;
};

export default {
    repeat: repeat,
    doUntil: doUntil
};

/**
 * Repeat specific function several times
 * @param {number} count - how many times repeat function
 * @param {function} callback - function to repeat
 * @return {Array<T>} result of functions
 */
export const repeat = <T>(count: number, callback: (number) => T): Array<T> => {
    const arr: Array<T> = [];
    for (let i: number = 0; i< count; i++) {
        arr.push(callback(i));
    }
    return arr;
};

export default {
    repeat: repeat
};

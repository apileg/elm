"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = exports.randomBetween = exports.randomInt = exports.randomTimestamp = exports.choose = void 0;
function choose(list) {
    const float = Math.random() * list.length;
    const index = Math.floor(float);
    return list[index];
}
exports.choose = choose;
function randomTimestamp() {
    return randomInt(Date.now());
}
exports.randomTimestamp = randomTimestamp;
function randomInt(max) {
    return Math.round(Math.random() * max);
}
exports.randomInt = randomInt;
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randomBetween = randomBetween;
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex = 0;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
exports.shuffle = shuffle;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const random_1 = require("./random");
const delay = process.argv.includes('--delay');
const die = process.argv.includes('--die');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const people = (() => {
    const result = [];
    const names = ['Fappinson', 'Bob', 'Alice', 'Anna', 'Jack', 'Bebop', 'Duwop', 'Jaz'];
    for (let i = 0; i < 15; ++i) {
        result.push({
            id: i,
            name: (0, random_1.choose)(names),
            age: (0, random_1.randomInt)(42)
        });
    }
    return result;
})();
app.get('/people', (request, response) => {
    people.sort((a, b) => {
        return Math.random() < 0.5 ? -1 : 1;
    });
    const dying = die && Math.random() < 1;
    if (dying) {
        response.status(542).end();
        return;
    }
    const beingSlow = delay && Math.random() < 0.5;
    if (beingSlow) {
        setTimeout(() => response.json(people), Math.random() * 3000 + 1000);
    }
    else {
        response.json(people);
    }
});
const server = app.listen(8000, () => console.log('Listening on 8000...'));
process.once('SIGINT', () => {
    console.log();
    server.closeAllConnections();
    server.close();
});

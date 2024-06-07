"use strict";
var _a;
const heroes = [
    {
        id: 1,
        name: 'ironman',
        owner: 'marvel'
    },
    {
        id: 2,
        name: 'spiderman',
        owner: 'marvel'
    },
    {
        id: 3,
        name: 'batman',
        owner: 'dc'
    }
];
const findHeroById = (id) => {
    return heroes.find((hero) => hero.id === id);
};
const hero = findHeroById(2);
console.log((_a = hero === null || hero === void 0 ? void 0 : hero.name) !== null && _a !== void 0 ? _a : 'No hero found');

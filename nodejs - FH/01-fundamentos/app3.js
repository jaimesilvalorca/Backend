const fs = require('fs');

const data = fs.readFileSync('README.md','utf8')

const words = data.split(' ');

const reactWordCount = words.filter((word)=>word.toLowerCase()==='react').length;

const reactWordCount3 = words.filter((word)=>word.toLowerCase().includes('react')).length

const reactWordCount2 = data.match(/react/gi ?? []).length;

console.log(reactWordCount)
console.log(reactWordCount2)
console.log(reactWordCount3)
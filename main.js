const readline = require('readline');
// fs ==> short for file system. Could be name anything.
const fs = require('fs');


const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let names = [];

const filesHasBeenRead = (err, data) => {
    if(err){
        throw err;
    }
    const obj = JSON.parse(data);
    names = obj.names;
}

fs.readFile('./names.json', filesHasBeenRead)

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const printRandomName = () => {
    console.log('\n' + randomElement(names) + ' is your random name!\n\n');
    interface.question('Type 1 to get a random name, 2 to add a name to the list. Anything else quits.\n\n', handleAnswer);
}

const addName = (name) => {
    names.push(name);
    const obj = {
        names: names,
    }
    const data = JSON.stringify(obj, null, 2);
    fs.writeFile('./name.json', data, 'utf8', (err) => {
        if(err){
            console.log(error);
            return;
        }

        console.log(`${name} was added to our database.\n\n`);
        interface.question('Type 1 to get a random name, 2 to add a name to the list. Anything else quits.\n\n', handleAnswer);
    });
}

const handleAnswer = (answer) => {
    if (answer === '1') {
        printRandomName();
    } else if (answer === '2') {
        interface.question('\nWhat name would you like to add?\n\n', addName)
    } else {
        console.log('Quitting...');
        interface.close();
    }
}

interface.question('Type 1 to get a random name, 2 to add a name to the list. Anything else quits.\n\n', handleAnswer);

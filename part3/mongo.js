const mongoose = require('mongoose')

if ( process.argv.length < 3) {
    console.log('enter password as argument')
    process.exit(1)
}

if ( process.argv.length === 3) {
    console.log('if statement for showAll')
    showAll()
}

if ( process.argv.length === 5) {
    console.log('if statement for savePerson')
    savePerson()
}
// ---- main process below ----- //

mongoConnect()
    
// ---- functions below   --------/

function mongoConnect() {
    //console.log('mongo connect')
    const password = process.argv[2]
    const url = 
        `mongodb+srv://fullstackNoob:${password}@cluster0-guhsy.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose.connect(
        url,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
    )
}

function savePerson () {
    console.log('save person function')
    const name = process.argv[3]    
    const number = process.argv[4]

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: name,
        number: number,
    })

    person
        .save()
        .then(response => {
            console.log(`added ${response.name} number ${response.number} to phonebook`) 
        })
        .catch(error => {
            console.log('Person is not saved', error)
        })
    
    mongoose.connection.close()
}

function showAll() {
    console.log('show all function')
    const Person = definePersonSchema()
    let print = 'phonebook:'
    console.log(print)
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                let string = person.name + ' ' + person.number
                console.log(string)
            })
        })
    
    mongoose.connection.close()
}

function definePersonSchema() {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    return mongoose.model('Person', personSchema)
}


/*
initalize library
receive user password 
connect to mongoose URL

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

//Is this defining a single model as person, and Schema
const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: 'Test1',
    number: '9999999',
})

person.save().then(response => {
    console.log('test person is saved')
    mongoose.connection.close()
})

console.log('mongoose connection is closing')
*/

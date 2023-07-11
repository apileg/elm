import express from 'express'
import cors from 'cors'
import { choose, randomInt } from './random'

const delay = process.argv.includes('--delay')
const die = process.argv.includes('--die')

const app = express()
app.use(cors())

interface Person {
    id: number
    name: string
    age: number
}

const people: Person[] = (() => {
    const result: Person[] = []
    const names = ['Fappinson', 'Bob', 'Alice', 'Anna', 'Jack', 'Bebop', 'Duwop', 'Jaz']

    for (let i = 0; i < 15; ++i) {
        result.push({
            id: i,
            name: choose(names),
            age: randomInt(42)
        })
    }

    return result
})()

app.get('/people', (request, response) => {
    people.sort((a, b) => {
        return Math.random() < 0.5 ? -1 : 1
    })

    const dying = die && Math.random() < 1

    if (dying) {
        response.status(542).end()
        return
    }

    const beingSlow = delay && Math.random() < 0.5

    if (beingSlow) {
        setTimeout(() => response.json(people), Math.random() * 3000 + 1000)
    }
    else {
        response.json(people)
    }
})

const server = app.listen(8000, () => console.log('Listening on 8000...'))

process.once('SIGINT', () => {
    console.log()

    server.closeAllConnections()
    server.close()
})

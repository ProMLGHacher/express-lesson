import express, { json } from 'express'
import postgres from 'postgres'

const sql = postgres({
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    db: 'test'
})


const app = express()
app.use(json())
const PORT = 3004

app.get('/', async (req, res) => {
    const data = await sql`select * from TestTable`
    res.send(data)
})

app.post('/', async (req, res) => {

    const { name } = req.body
    const data = await sql`insert into TestTable(name) values(${name})`
    res.send(200)
})

const start = async () => {
    await sql`create table if not exists TestTable(
        id serial primary key,
        name varchar(100)
    )`
    app.listen(PORT, () => {
        console.log("Сервак запущен")
    })
}

start()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()

const schema = require('../schema/schema')

const app = express()
const PORT = 3005

const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white
const blueMsg = chalk.bgKeyword('blue').white

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(res => console.log(successMsg('Connected to DB')))
	.catch(error => console.log(errorMsg(error)))

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(PORT, err => {
	err ? console.log(err) : console.log(blueMsg('🚀 Server started'))
})

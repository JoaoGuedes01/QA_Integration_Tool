const express = require('express')
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/mongo')
const tfsRouter = require('./routes/tfsRoutes')
const qabdRouter = require('./routes/qabdRoutes')
const jiraRouter = require('./routes/jiraRoutes')

const app = express()
connectDB()

// Setting CORS Configuration
app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.use(express.static(path.join(__dirname, './build')));

// TFS Routes
app.use('/api/tfs', tfsRouter);
app.use('/api/qabd', qabdRouter);
app.use('/api/jira', jiraRouter);

// Serving React App
app.get('*', async (req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000, () => {
    console.log('App running')
})
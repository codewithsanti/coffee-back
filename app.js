import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001 

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.listen(PORT, ()=> {
    console.log(`Server running and listening on port ${PORT}`)
})
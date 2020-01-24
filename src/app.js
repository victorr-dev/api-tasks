const app = require('./server')
const {PORT} = require('./config')

async function main(){
    await app.connectDb()
    await app.listen(PORT)

    console.log(`Server is running in port: ${PORT}`)
}

main()
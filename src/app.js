const app = require('./server')

async function main(){
    await app.listen(3000)

    console.log(`Server is running in port: 3000`)
}

main()
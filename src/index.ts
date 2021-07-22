import { createConnection } from "typeorm"
import express from 'express' 
import { Banker } from "./entities/Banker"
import { Client } from "./entities/Client"
import { Transaction } from "./entities/Transaction"
import { createClientRouter } from "./routes/create_client"
import { createBankerRouter } from "./routes/create_banker"
import { createTransactionRouter } from "./routes/create_transaction"
import { connectBankerToClient } from "./routes/connect_banker_to_client"


const app = express();
const main = async () => {
  try{
    await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "project",
        entities: [Client, Banker, Transaction],
        synchronize: true
    })
    console.log(" Connected to Database ")
    app.use(express.json());

    app.use(createClientRouter)
    app.use(createBankerRouter)
    app.use(createTransactionRouter)
    app.use(connectBankerToClient)

    app.listen(3030,  () => {
      console.log(" Running on port 3030");
    })

  } catch (err) {
      console.error(" Unable to Connect", err);
  }
}

main();
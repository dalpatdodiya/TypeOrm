import express from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionTypes } from '../entities/Transaction';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOne(parseInt(clientId));
    if(!client){
        return res.json({
            message: " Client Not Found "
        })
    }
    const transaction = Transaction.create({
        amount,
        type,
        client
    })

    await transaction.save();

    if(type === TransactionTypes.DEPOSITE){
        client.balance = +client.balance + parseInt(amount);
    } else if(type === TransactionTypes.WITHDROW){
        client.balance = client.balance - parseInt(amount);
    }
    await client.save();

    return res.json({
        message: " Transaction added"
    })
})

export{
    router as createTransactionRouter
}
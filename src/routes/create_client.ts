import express from 'express';
import { createQueryBuilder } from 'typeorm';
//import { Banker } from '../entities/Banker';
import { Client } from '../entities/Client';

const router = express.Router();

router.get('/api/clients', async(req, res) => {
    const client = await createQueryBuilder('client')
        .select('client.first_name')
        .addSelect('client.balance')
        .from(Client, 'client')
        .leftJoinAndSelect('client.transactions', 'transactions')
        .where('client.balance > :minBalance', {minBalance: 10000})
        .getMany()

    return res.json(client);
})

router.post('/api/client', async (req, res) => {

    const { firstname, lastname, email, cardNumber, balance } = req.body;
    const client = Client.create({
        first_name: firstname,
        last_name: lastname,
        email: email,
        card_number: cardNumber,
        balance: balance
    });
    await client.save();
    return res.json(client);
});

router.delete('/api/client/:clientId', async (req, res) => {
    const {clientId} = req.params;

    const response = await Client.delete(clientId)

    return res.json({ Message: "Client Deleted Successfully " , Result: response})
});
// router.post('/ap  i/banker', async (req, res) => {

//     const { firstname, lastname, email, cardNumber, employeeNumber } = req.body;
//     const banker = Banker.create({
//         first_name: firstname,
//         last_name: lastname,
//         email: email,
//         card_number: cardNumber,
//         employee_number: employeeNumber
//     });
//     await banker.save();
//     return res.json(banker);
// });

export{
    router as createClientRouter
}
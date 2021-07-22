import express from 'express';
import { Banker } from '../entities/Banker';
import { Client } from '../entities/Client';

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {

    const { bankerId, clientId } = req.params;

    const client = await Client.findOne(+clientId);

    const banker = await Banker.findOne(+bankerId);

    if(!banker || !client){
        return res.json({ Message: " Banker Or Client Not Found "});
    }

    banker.clients = [
        client
    ]
    await banker.save();

    return res.json({ Message: " Banker Connect to Client "})

    
});


export{
    router as connectBankerToClient
}
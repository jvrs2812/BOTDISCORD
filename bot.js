const express = require('express');
const basicAuth = require('basic-auth-connect');

const { Client, Intents, ClientPresence, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('OTEwMTMzODEzNTQ2NDc1NTMw.YZOaKg.OL3KjIiGsMRHW4upKRe7logEFpM');

const app = express();
app.use(express.json());
app.use(basicAuth('HURON', 'savana@')); 

app.post('/log',async function(req,res){
  try{
    const channel = await client.channels.fetch('910133499351150603');
    
    var msg = req.body.message;

    if(msg){
      channel.send(msg);
    }else{
      throw new Error('Campo message esta vazio');
    }
    res.status(201).send();
  }catch(err){
    res.status(400).json({"error":err.message})
  }
})

app.listen(3333);
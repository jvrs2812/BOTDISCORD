const express = require('express');
const basicAuth = require('basic-auth-connect');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.LOGIN);

const app = express();
app.use(express.json());
app.use(basicAuth(process.env.AUTH_LOGIN, process.env.AUTH_PASS)); 

app.post('/log',async function(req,res){
  try{
    const channel = await client.channels.fetch(process.env.CHANNEL);
    
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

let port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log('rodando na porta:');
  console.log(port);
});

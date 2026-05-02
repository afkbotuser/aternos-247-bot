const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Keep Render alive with a web server
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => console.log(`Web server listening on port ${port}`));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'primesmpseasons.aternos.me', 
        port: 25565,
        username: 'AFK_Bot',
        version: '1.20.1'        
    });

    bot.on('login', () => console.log('Bot has logged in!'));
    
    // Restart bot if it gets kicked
    bot.on('end', () => {
        console.log('Bot disconnected, reconnecting...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log(err));
}

createBot(); // Actually call the function to start the bot

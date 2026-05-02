const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 1. Keep Render alive with a web server
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});

function createBot() {
    const bot = mineflayer.createBot({
        host: 'primesmpseasons.aternos.me', 
        port: 25565,
        username: 'AFK_Bot',
        version: '1.20.1'        
    });

    // 2. Anti-AFK Movement: Jumps every 60 seconds to stay active
    bot.on('spawn', () => {
        console.log('Bot spawned in the server!');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000); 
    });

    bot.on('login', () => {
        console.log('Bot has logged in successfully!');
    });

    // 3. Detailed Error Logging: Find out WHY it is disconnecting
    bot.on('kicked', (reason) => {
        console.log(`Kicked from server. Reason: ${reason}`);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('Error: Connection refused. Is the Aternos server Online?');
        } else {
            console.log(`Bot Error: ${err.message}`);
        }
    });

    // 4. Reconnect Delay: Wait 30 seconds before trying again to avoid being blocked
    bot.on('end', () => {
        console.log('Bot disconnected. Waiting 30 seconds to reconnect...');
        setTimeout(createBot, 30000); 
    });
}

// Start the bot process
createBot();

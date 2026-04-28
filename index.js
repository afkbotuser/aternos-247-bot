const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. Keep-Alive Web Server
app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(3000, () => console.log('Web server ready.'));

// 2. Bot Configuration
function createBot() {
    const bot = mineflayer.createBot({
        host: 'primesmpseasons.aternos.me', // Change this
        port: 25565,
        username: 'AFK_Bot',
        version: '1.20.1'               // Change to your version
    });

    bot.on('login', () => console.log('Bot joined the server!'));

    // Anti-AFK (Jumps every 1 minute)
    setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);

    bot.on('error', (err) => console.log('Error:', err));
    bot.on('end', () => {
        console.log('Disconnected. Reconnecting in 5s...');
        setTimeout(createBot, 5000);
    });
}

createBot();

const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is Online!');
});

app.listen(3000, () => {
    console.log('Web server is running.');
});

function createBot() {
    const bot = mineflayer.createBot({
        host: 'primesmpseasons.aternos.me',
        port: 25565,
        username: 'AFK_Bot',
        version: '1.20.1'
    });

    bot.on('login', () => {
        console.log('Bot joined the server!');
    });

    bot.on('end', () => {
        console.log('Disconnected. Reconnecting in 30 seconds...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => {
        console.log('Error encountered:', err.message);
    });
}

createBot();

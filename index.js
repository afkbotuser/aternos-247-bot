const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Healthy!'));
app.listen(3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'primesmpseasons.aternos.me', 
        port: 25565,
        username: 'AFK_Bot',
        version: '1.20.1',
        hideErrors: true // This prevents some crashes
    });

    bot.on('login', () => console.log('Bot joined!'));

    // Anti-AFK
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 60000);

    // CRITICAL: Better Reconnect
    bot.on('end', (reason) => {
        console.log('Disconnected:', reason);
        setTimeout(createBot, 30000); // Wait 30 seconds before trying again
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('Server is Offline. Retrying in 1 minute...');
            setTimeout(createBot, 60000);
        } else {
            console.log('Error:', err);
        }
    });
}

createBot();

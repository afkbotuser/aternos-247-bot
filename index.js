const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web server for Render health checks
app.get('/', (req, res) => res.send('Bot Status: Active'));
app.listen(10000, '0.0.0.0', () => console.log('Web Server Live on Port 10000'));

function createBot() {
    console.log("Attempting to connect to Aternos...");
    const bot = mineflayer.createBot({
        host: 'primesmpseasons.aternos.me',
        port: 25565,
        username: 'AFK_Bot',
        version: '1.20.1',
        checkTimeoutInterval: 60000 // Higher timeout for slow free servers
    });

    bot.on('login', () => {
        console.log('--- SUCCESS: Bot is in the server ---');
    });

    // Simple jump to keep active
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 60000);

    bot.on('error', (err) => {
        console.log('Connection Error:', err.message);
    });

    bot.on('end', () => {
        console.log('Disconnected. Waiting 60 seconds to retry...');
        setTimeout(createBot, 60000); // 1 minute wait prevents crash loops
    });
}

// Wait 10 seconds before starting to let the web server boot first
setTimeout(createBot, 10000);

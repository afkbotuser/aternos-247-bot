const mineflayer = require('mineflayer');
const express = require('express');

// 1. WEB SERVER (Prevents Render from sleeping)
const app = express();
app.get('/', (req, res) => res.send('Bot is strictly online 24/7!'));
app.listen(3000, () => console.log('Web Panel Ready.'));

// 2. BOT CONFIGURATION
const botArgs = {
    host: 'primesmpseasons.aternos.me', // Your Server IP
    port: 25565,                         // Standard Java Port
    username: 'AFK_Bot',                 // Bot Name
    version: '1.20.1'                    // Your Server Version
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    // Join Message
    bot.on('login', () => {
        console.log(`[SUCCESS] ${bot.username} joined the server.`);
    });

    // 3. SMART ANTI-AFK (Jumps every 60 seconds)
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 60000);

    // 4. ERROR HANDLING (Prevents Status 134/Crashes)
    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`[RETRY] Server offline. Reconnecting in 2 minutes...`);
        } else {
            console.log(`[ERROR] Occurred: ${err.message}`);
        }
    });

    // 5. RECONNECT LOGIC (If kicked or server restarts)
    bot.on('end', (reason) => {
        console.log(`[DISCONNECTED] Reason: ${reason}. Restarting in 30s...`);
        
        // Clear all listeners to prevent memory leaks
        bot.removeAllListeners();
        
        // Wait 30 seconds before reconnecting to stay safe with Aternos
        setTimeout(createBot, 30000);
    });
}

// Start the bot for the first time
createBot();

const mineflayer = require('mineflayer');
const http = require('http');

// ==================== [ خادم وهمي لإبقاء Render شغال ] ====================
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.write("Bot Anti-Ban Active!");
    res.end();
}).listen(PORT, () => {
    console.log(`[+] Web server listening on port ${PORT}`);
});

// ==================== [ إعدادات السيرفر ] ====================
const CONFIG = {
    host: 'AZEER5559475.aternos.me', // IP السيرفر
    port: 12918,                  // البورت من Aternos
    username: 'Player_Alex99',    // اسم البوت
    owner: 'YOUR_MINECRAFT_NAME', // اسم حسابك
    password: 'YourPassword123'   // كلمة سر البوت
};

function startBot() {
    console.log('[*] جاري الاتصال بالسيرفر الآن...');

    try {
        const bot = mineflayer.createBot({
            host: CONFIG.host,
            port: CONFIG.port,
            username: CONFIG.username,
            version: false,
            checkTimeoutInterval: 30 * 1000,
            hideErrors: false
        });

        bot.on('spawn', () => {
            console.log(`[+] نجاح! البوت (${bot.username}) دخل السيرفر الآن.`);
            startMovement(bot);
        });

        bot.on('messagestr', (message) => {
            const msg = message.toLowerCase();
            if (msg.includes('/register')) {
                bot.chat(`/register ${CONFIG.password} ${CONFIG.password}`);
            } else if (msg.includes('/login')) {
                bot.chat(`/login ${CONFIG.password}`);
            }
        });

        bot.on('end', (reason) => {
            console.log(`[-] انقطع الاتصال: ${reason}. إعادة المحاولة بعد 10 ثوانٍ...`);
            setTimeout(startBot, 10000);
        });

        bot.on('error', (err) => {
            console.log(`[-] خطأ اتصالات: ${err.message}. إعادة المحاولة...`);
            setTimeout(startBot, 10000);
        });

    } catch (e) {
        console.log(`[-] خطأ كود: ${e.message}`);
        setTimeout(startBot, 10000);
    }
}

function startMovement(bot) {
    setInterval(() => {
        if (!bot.entity) return;
        
        // حركة عشوائية بسيطة
        if (Math.random() > 0.5) {
            bot.setControlState('forward', true);
            setTimeout(() => bot.setControlState('forward', false), 1000);
        } else {
            const yaw = (Math.random() * Math.PI * 2) - Math.PI;
            bot.look(yaw, 0, false);
        }
    }, 4000);
}

// تشغيل البوت فوراً
startBot();

            

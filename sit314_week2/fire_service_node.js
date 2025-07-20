const net = require("net");
const host = "127.0.0.1";
const port = 6000;
const region = "Central";

const levels = ["NO RATING", "MODERATE", "HIGH", "EXTREME", "CATASTROPHIC"];

const client = net.createConnection(port, host, () => {
    console.log("Connected to weather service");
    setInterval(() => {
        const level = levels[Math.floor(Math.random() * levels.length)];
        client.write(`fire,${level},${region}`);
    }, 3000);
});

client.on("data", (data) => console.log(`Received: ${data}`));
client.on("error", (error) => console.log(`Error: ${error.message}`));
client.on("close", () => console.log("Connection closed"));

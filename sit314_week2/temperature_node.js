const net = require("net");

const host = "127.0.0.1";
const port = 6000;
const region = "Central"; 

const client = net.createConnection(port, host, () => {
    console.log("Connected");

    setInterval(() => {
        const temp = Math.floor(Math.random() * 40) + 1;
        client.write(`temp,${temp},${region}`);
    }, 2000);
});

client.on("data", (data) => {
    console.log(`Received: ${data}`);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});

const net = require("net");

const host = "127.0.0.1";
const port = 6000;
const region = "Central";

client.write(`request,0,${region}`);

const client = net.createConnection(port, host, () => {
    console.log("Connected");
    setInterval(() => {
	client.write(`request,0`);
    }, 2000); // Interval in milliseconds (2000ms = 2 seconds)
});

client.on("data", (data) => {
    console.log(`Received: ${data}`);
//    process.exit(0);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});
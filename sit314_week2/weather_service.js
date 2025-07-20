const net = require("net");
const port = 6000;

let temp;
let wind;
let rain;
let fireLevel;
let regions = {};


const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
        const strData = data.toString();
        console.log(`Received: ${strData}`);

        const command = strData.split(",");
        const name = command[0];
        const value = parseFloat(command[1]);
        const region = command[2];
        let result;
	console.log(name);
	console.log(value);

    if (!regions[region]) {
        regions[region] = { temp: null, rain: null, wind: null, fire: null };
    }
    
    switch (name) {
        case "temp":
            regions[region].temp = value;
            result = "ok";
            break;
        case "rain":
            regions[region].rain = value;
            result = "ok";
            break;
        case "wind":
            regions[region].wind = value;
            result = "ok";
            break;
        case "fire":
            regions[region].fire = command[1]; // use raw string
            result = "ok";
            break;
        case "request":
            const r = region; // default to Central if undefined
            const temp = regions[r]?.temp ?? 0;
            const rain = regions[r]?.rain ?? 999;
            const wind = regions[r]?.wind ?? 0;
            const fire = regions[r]?.fire ?? "NO RATING";
    
            if (temp > 20 && rain < 50 && wind > 30) {
                result = `⚠️ WEATHER WARNING (${r}) | Fire Level: ${fire}`;
            } else {
                result = `✅ Everything fine in ${r} | Fire Level: ${fire}`;
            }
            break;
    }
        socket.write(result.toString());
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.log(`Socket Error: ${error.message}`);
    });
});

server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
});

server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
});
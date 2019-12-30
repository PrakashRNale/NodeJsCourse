const http = require('http'); // import this module to create server
const fs = require('fs'); // import this module to work with file system

const server = http.createServer((req , res) => {
    const url = req.url; // Url of the request
    const method = req.method; // Method of request eg POST , GET
    if(url === "/"){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<Body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === "/message" && method === "POST"){
        const body = [];
        // following event will be executed on every incoming data. Data will be received in buffers, 
        //so for every buffer we will get data and this event will get executed
        req.on('data', (dataChunk) => {
            body.push(dataChunk);
        })

        // end event will get executed when all incoming data has received on server
        req.on('end', () =>{
            const parseBody = Buffer.concat(body).toString(); // // parseBody is  "message = incmintValue", and message is from above input name message
            const message = parseBody.split('=')[1]; 
            fs.writeFileSync('message.txt', message);
        })
        
        res.statusCode = 302; // Thsi code is to redirect request
        res.setHeader('Location','/');
        return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<Body><h1>Hello from Nodejs server</h1></body>');
    res.write('</html>');
});

server.listen(5000);
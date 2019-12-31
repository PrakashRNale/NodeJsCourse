const fs = require('fs');

const routeHandler = (req , res) =>{
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
        return req.on('end', () =>{
            const parseBody = Buffer.concat(body).toString(); // // parseBody is  "message = incmintValue", and message is from above input name message
            const message = parseBody.split('=')[1]; 
            //fs.writeFileSync('message.txt', message); // writeFileSync is a blocking code. If we have 1mb file then it will wait till whole file is written. So use writeFile()
            fs.writeFile('message.txt', message,  error =>{
                // if we put below code in this function then this is async code and will be executed in future. 
                //Before executing this code below code gets executed so to avode this , return this function
                res.statusCode = 302; // Thsi code is to redirect request
                res.setHeader('Location','/');
                return res.end();
            })
            
        })
        
        
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<Body><h1>Hello from Nodejs server</h1></body>');
    res.write('</html>');
}

// module.exports.handler = routeHandler;
// module.exports.someText = "This is hardcoded value";

// exports.handler = routeHandler;
// exports.someText = "This is hardcoded value";

module.exports = {
    handler : routeHandler,
    someText : "This is hardcoded value"
}
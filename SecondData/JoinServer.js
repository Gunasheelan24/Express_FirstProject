let Express = require("express");
let PORT    = 3000;
let App     = Express();
let fs      = require("fs");
let path    = require("path");
let body    = require("body-parser");

App.use(body.urlencoded({extended:false}));

App.get("/", ((request, response, Next) => { 
    response.send('<h1>Hi Server</h1>')
})) 

App.get("/Input", ((request, response, Next) => { 
    response.send('<form action="/Message" method="POST" ><input type="text" name="Value"><button type="submit">submit</button></form>');
    response.statusCode = 203;
}))


App.post("/Message" ,(request, response, Next) => { 
    let Data = request.body;
    let FinalData = Data.Value;
    fs.writeFileSync(path.join(__dirname, "TextFile.txt"),FinalData,((error) => { 
     if(error) { 
       console.log(error);
     }
     console.log("Success Done")
     response.redirect("Location", "/"); 
    }
    ));
})

App.listen(PORT, (() => { 
    console.log(`Server Running In http://localhost:${PORT}`)
}))
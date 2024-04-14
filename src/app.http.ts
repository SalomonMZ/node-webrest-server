import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }
  if (req.url === "/css/styles.css") {
    const cssFile = fs.readFileSync("./public/css/styles.css", "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(cssFile);
    return;
  }
  if (req.url === "/js/app.js") {
    const jsFile = fs.readFileSync("./public/js/app.js", "utf-8");
    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.end(jsFile);
    return;
  }

  //   const data = { name: "John Doe", age: 30, city: "New York" };
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(data));

  // switch(req.url) {
  //     case '/about':
  //         res.writeHead(200, {'Content-Type': 'text/html'})
  //         res.write('<h1>This is the about</h1>')
  //         res.end()
  // }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
let session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}));

app.get('/', list);                  
app.get('/sort', sort);
app.get('/add', add);
app.get('/remove', remove);
app.get('/clear', clear);

app.listen(process.env.PORT,  process.env.IP, startHandler());


function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT);
}

function sort(req, res)
{
  let sorted =req.session.songs.sort();
  let result={'songs' : sorted};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}

function list(req, res)
{
  req.session.songs=new Array();
  let result = {'songs' : `${req.session.songs}`};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
    
}

function add(req, res, song)
{
  req.session.songs.push(song);
  let result = {'songs' : req.session.songs};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}

function remove(req, res)
{
  //var a = req.session.songs lastIndexOf(req.query.song);
  let result = {'songs' : req.session.songs};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}

function clear(req, res)
{
  req.session.songs = undefined; 
  let result= {'songs' : `${req.session.songs}`};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}
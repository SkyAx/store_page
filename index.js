//Команда require запрашивает модуль из папки node_modules
const express = require('express');
const path = require('path');
const jsonDb = require('node-json-db').JsonDB;
const bodyParser = require('body-parser');

let db = new jsonDb("./db/products", true, false);
const app = express();

//Настройка выдачи статических файлов
app.use('/styles', express.static('styles/'));
app.use('/img', express.static('images/'));
app.use('/js', express.static('js/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Настройка порта сервера
app.set('port', process.env.PORT || 8080);

//Обработка корневого маршрута
app.get('/', function (req, res) {
    //Отправляем файл страницы
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function (req, res) {
    //Отправляем файл страницы
    res.sendFile(path.join(__dirname + '/pages/about.html'));
});

app.get('/contacts', function (req, res) {
    //Отправляем файл страницы
    res.sendFile(path.join(__dirname + '/pages/contacts.html'));
});



app.get('/getProductsCount', (req, res, next) => {
    let products = (db.getData('/products'));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count: products.length}));
    next();
});

app.get('/getProducts', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getData('/products')));
});

app.post('/addProduct', (req, res) => {
    if(!(db.getData('/products').find(obj => obj.productId === req.body.productId))){
        db.push('/products[]', req.body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"success", products: db.getData('/products')}));
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"error",error:"Этот продукт уже находится в корзине"}));
    }
});

app.post('/deleteProduct', (req, res) => {
    let product = db.getData('/products').find(obj => obj.productId === req.body.productId);
    let idx = db.getData('/products').indexOf(product);

    if (product) {
        db.delete(`/products[${idx}]`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"success", products: db.getData('/products')}));
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"error",error:"product not found"}));
    }
});

app.post('/increaseCountOfProduct', (req, res) => {
    let product = db.getData('/products').find(obj => obj.productId === req.body.productId);
    let idx = db.getData('/products').indexOf(product);
    let currentCount = db.getData(`/products[${idx}]/productCount`);

    if (product) {
        db.push(`/products[${idx}]/productCount`, +currentCount + 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"success", currentProductCount: db.getData(`/products[${idx}]/productCount`)  }));
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"error",error:"can't increase count of product"}));
    }
});

app.post('/decreaseCountOfProduct', (req, res) => {
    let product = db.getData('/products').find(obj => obj.productId === req.body.productId);
    let idx = db.getData('/products').indexOf(product);
    let currentCount = db.getData(`/products[${idx}]/productCount`);

    if (product) {
        db.push(`/products[${idx}]/productCount`, +currentCount - 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"success", currentProductCount: db.getData(`/products[${idx}]/productCount`)  }));
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({state:"error",error:"can't decrease count of product"}));
    }
});

//Просшуиваем порт на запросы
app.listen(app.get('port'));

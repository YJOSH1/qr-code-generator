let express = require('express');
let app = express();
app.listen(process.env.PORT || 3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('./public/img'));
app.use(express.static('./public/css'));
app.use(express.static('./public/js'));

let qrcode = require('qrcode');

app.get('/', function (req, res) {
    res.render('index.html', {qrGen: false, qrCode: undefined});
});

app.post('/', function (req, res) {
    let url = req.body.url;
    let qrGen = false;
    
    qrcode.toDataURL(url, function (err, url) {
        if (err) {
            throw err;
        }
        qrGen = true;
        res.render('index.html', {qrGen: qrGen, qrCode: url});
    });
});
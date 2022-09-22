const { renderFile } = require('ejs');
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

app.post('/generated', function (req, res) {
    let url = req.body.url;
    let size = req.body.size;
    let qrGen = false;

    let opts = {
        type: 'image/png',
        width: size
    }
    
    qrcode.toDataURL(url, opts, function (err, url) {
        if (err) {
            throw err;
            res.redirect('/error');
        }
        qrGen = true;
        res.render('generated.html', {qrGen: qrGen, qrCode: url});
    });
});
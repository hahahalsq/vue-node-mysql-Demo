var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser')
const mysql             = require('mysql')

const mysqlConfig = {
    host:'localhost',
    user:'root',               // 数据库用户名
    password:'root',         // 数据库密码
    database:'test2',
    port:'3306'
}
const pool=mysql.createPool({
    host:mysqlConfig.host,
    user:mysqlConfig.user,
    password:mysqlConfig.password,
    database:mysqlConfig.database,
    port:mysqlConfig.port,
    multipleStatements: true    // 多语句查询
});

//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许源访问，本利前端访问路径为“http://localhost:8080”
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});


//使用bodyParse解释前端提交数据
app.use(bodyParse.urlencoded({extended:true})) ;
app.use(bodyParse.json());

// 处理根目录的get请求
app.get('/',function(req,res){
}) ;

// 处理/login请求
app.post('/login',function(req,res){
    //获取登录名称和密码
    name=req.body.name ;
    pwd=req.body.pwd;
    console.log(name)
    console.log(pwd)
    //向前台反馈信息
    pool.getConnection((err,connection) => {
        var sql = 'SELECT * FROM user WHERE username = ? and password = ? '
        connection.query(sql,[name,pwd],(err,result) =>{
            console.log(result)
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

// 用户注册信息接口
app.post('/register',function(req,res){
    //获取登录名称和密码
    username = req.body.name;
    password = req.body.pwd;
    level = req.body.level;
    state = 1;
    //向前台反馈信息
    pool.getConnection((err,connection) => {
        var sql = 'INSERT INTO user (username,password,state,level) VALUES (?,?,?,?)'
        connection.query(sql,[username,password,state,level],(err,result) =>{
            console.log(result)
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});


// 处理请求用户账号信息列表请求
app.post('/getUserList',function(req,res){
    name=req.body.username
    state=req.body.state
    pool.getConnection((err,connection) => {
        var sql = 'SELECT * FROM user'
        // var sql = 'UPDATE user SET state = ? WHERE username = ?'
        connection.query(sql,[name,state],(err,result) =>{
            console.log(result)
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});
// 管理员操作账户状态
app.post('/adminChangeState',function(req,res){
    name = req.body.username
    state = req.body.state
    console.log(name,state)
    pool.getConnection((err,connection) => {
        var sql = 'UPDATE user SET state = ? WHERE username = ?'
        connection.query(sql,[state,name],(err,result) =>{
            console.log(result)
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});


app.post('/getHoldList',function(req,res){
    username=req.body.username;
    pool.getConnection((err,connection) => {
        var sql = 'SELECT * FROM goodsInfo WHERE username = ? '
        connection.query(sql,[username],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

// 商户提交商品信息接口
app.post('/submitgoodsform',function(req,res){

    goodsname = req.body.goodsname;
    price = req.body.price;
    amount = req.body.amount;
    content = req.body.describe;
    username = req.body.username;
    state = req.body.state;
    pool.getConnection((err,connection) => {
        var sql = 'INSERT INTO goodsInfo (goodsname,price,amount,state,username,content) VALUES (?,?,?,?,?,?)'
        connection.query(sql,[goodsname,price,amount,state,username,content],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

// 商品操作状态
app.post('/goodsChangeState',function(req,res){
    state = req.body.state
    id = req.body.id
    pool.getConnection((err,connection) => {
        var sql = 'UPDATE goodsInfo SET state = ? WHERE id = ? '
        connection.query(sql,[state,id],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

app.post('/getMarketList',function(req,res){
    pool.getConnection((err,connection) => {
        var sql = 'SELECT * FROM goodsInfo'
        connection.query(sql,(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

app.post('/getCarList',function(req,res){
    username = req.body.username
    console.log(username)
    pool.getConnection((err,connection) => {
        var sql = 'SELECT * FROM cars WHERE username = ?'
        connection.query(sql,[username],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});


app.post('/addCar',function(req,res){
    id = req.body.id
    username = req.body.username
    goodsname  = req.body.goodsname
    price = req.body.price
    buynum = req.body.buynum
    sellname = req.body.sellname
    pool.getConnection((err,connection) => {
        var sql = 'INSERT INTO cars (username,id,goodsname,price,buynum,sellname) VALUES (?,?,?,?,?,?) '
        connection.query(sql,[username,id,goodsname,price,buynum,sellname],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

// 商品操作状态
app.post('/updateCar',function(req,res){
    id = req.body.id
    username = req.body.username
    goodsname  = req.body.goodsname
    price = req.body.price
    buynum = req.body.buynum

    pool.getConnection((err,connection) => {
        var sql = 'UPDATE cars SET buynum = ? WHERE id = ? AND username = ?'
        connection.query(sql,[buynum,id,username],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});


app.post('/delCar',function(req,res){
    id = req.body.id
    username = req.body.username
    pool.getConnection((err,connection) => {
        var sql = 'DELETE FROM cars WHERE id = ? AND username = ? '
        connection.query(sql,[id,username],(err,result) =>{
            console.log(err)
            console.log(result)
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});

app.post('/addDone',function(req,res){
    console.log(req)
    console.log('*******************')
    id = req.body.id
    username = req.body.username
    goodsname  = req.body.goodsname
    price = req.body.price
    buynum = req.body.buynum
    sellname = req.body.sellname
    pool.getConnection((err,connection) => {
        var sql = 'INSERT INTO dones (username,id,goodsname,price,buynum,sellname) VALUES (?,?,?,?,?,?) '
        connection.query(sql,[username,id,goodsname,price,buynum,sellname],(err,result) =>{
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});






// 普通用户提交信息接口
app.post('/submitform',function(req,res){
    //获取登录名称和密码
    name = req.body.name;
    sex = req.body.sex;
    date1 = req.body.date1;
    date2 = req.body.date2;
    org = req.body.org;
    delivery = req.body.delivery;
    dtext = req.body.desc;

    console.log(name)
    console.log(sex)
    console.log(date1)
    console.log(date2)
    console.log(org)
    console.log(delivery)
    console.log(dtext)
    //向前台反馈信息

    pool.getConnection((err,connection) => {
        var sql = 'INSERT INTO subform (name,sex,date1,date2,org,delivery,dtext) VALUES (?,?,?,?,?,?,?)'
        connection.query(sql,[name,sex,date1,date2,org,delivery,dtext],(err,result) =>{
            console.log(result)
            res.status(200).send(
                result
              ) ;
            connection.release();
        })
    })
});


// 监听3000端口
var server=app.listen(3000);

console.log("服务器已运行");
console.log("监听网址为:http://127.0.0.1:3000/");
const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const {User} = require('./models/User');
const config = require('./config/key');

//application/x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application.json 
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res)=>{
    //회원가입시 필요한 정보를 client에게서 가져오면
    //데이터베이스에 넣어준다



    const user = new User(req.body);

    user.save((err,userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
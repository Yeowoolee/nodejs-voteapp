var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var admin = require('firebase-admin')

var serviceAccount = require('./withmegg-ee922-firebase-adminsdk-xytq1-6517f2d45d.json')

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://withmegg-ee922.firebaseio.com'
})

var database = firebaseAdmin.database()

// app에서 express프레임워크 사용
var app = express()

//html문을 ejs엔진을 이용해 편집? 수정하기 위해 set으로 정의
app.set('view engine', 'ejs')

//css와 같은 정적 파일을 사용하기 위해 use로 정의
app.use(express.static('views'))

// views의 경로 set
app.set('views', __dirname + '/views')

// 클라이언트로부터 메시지 받기위해 사용
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// 미들웨어를 통한 인증
function isAuthenticated(request, response, next){
    // 유저가 로그인 했는지 체크
    // 리퀘스트 오브젝트에 접근한 경우
    // 오류와 함께 로그인 페이지로 보내지 않은 경우
    next()

}

 

//서버를 통하는 요청 로그를 터미널에 표시
app.use(logger('dev'))

app.get('/', function(request, response){
    var languagesRef = database.ref('/languages')

    languagesRef.once('value', function(snapshot){
        var data = snapshot.val()
        if (!data){
            data = {}
        }
        response.render('home.ejs', {languages : snapshot.val()})
    })
})

var port = (process.env.PORT || '3000');

app.listen(port, function(){
    console.log('App running on port ' + port)
})
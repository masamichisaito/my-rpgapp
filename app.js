const express = require('express');
const path = require('path');
const session = require('express-session');
const rpgRoutes = require('./routes/rpg');
const app = express();

const PORT = process.env.PORT || 3000;

// 静的ファイル配信（.json, .tmj用MIME設定付き）
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.json') || filePath.endsWith('.tmj')) {
      res.setHeader('Content-Type', 'application/json');
    }
  }
}));

// ミドルウェア
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// セッションをテンプレート内で使えるようにする
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// テンプレートエンジン設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// トップページアクセス時にRPGスタート画面へリダイレクト
app.get('/', (req, res) => {
  res.redirect('/rpg/start');
});

// RPGルート
app.use('/rpg', rpgRoutes);

module.exports = app;

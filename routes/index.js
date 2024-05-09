// index.js
var express = require("express");
var router = express.Router();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("Warehousing", "blackcat9052", "Sfhjlk9052", {
  host: "warehousing.database.windows.net",
  dialect: "mssql",
});

const User = sequelize.define(
  "Company",
  {
    // 定義 Model 屬性
    com_name: {
      // 欄位名稱
      type: Sequelize.STRING, //  資料型態
      allowNull: false, // 能不能為空，預設是 true
    },
    com_homemadeName: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

/* GET home page. localhost:3000/ */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET localhost:3000/test */
router.get("/test", function (req, res, next) {
  sequelize.sync().then(() => {
    // 寫入對映欄位名稱的資料內容
    User.findAll().then((users) => {
      // 用 JSON.stringify() 來格式化輸出
      console.log("All users:", JSON.stringify(users, null, 4));
    });
  });
  res.send("This is localhost:3000/test");
});

module.exports = router;

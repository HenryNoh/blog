const path = require('path');
const model = require('./model');
const hashing = require('./config/hashing.js')
const {salt}  = require(path.join(__dirname, 'config', 'db.json'))

const AWS = require('aws-sdk');
AWS.config.loadFromPath(
    path.join(__dirname, 'config', 'awsConfig.json')
// RDS 보안 정보가 담긴 awsConfig.json 파일의 경로와 이름을 알맞게 기입합니다.
  );

  module.exports = {
    needs: () => upload,
    api : {
        sendPw : (req, res) => {
            const body = req.body;
            const hash = hashing.enc(body.id, body.password, salt)
            model.api.searchInfo(body, hash, result => {
                var obj = {};
                if(result[0]) {
                    obj['suc'] = true;
                    obj['msg'] = '로그인 성공';
    
                  } else {
                    obj['suc'] = false;
                    obj['msg'] = '로그인 실패';
                  }
                  
                  res.send(obj);
              })
        },
    },
    add : {
        board : (req, res) => {
            const body = req.body;

            model.add.board(body, result => {
                if(result) {
                    res.send(true);
                }
            })
        },
    },
    get : {
        board : (req, res) => {
            const body = req.body;
  
            model.get.board(body, result => {
                if(result) {
                    res.send(result);
                }
            })
        },
        board_cnt : (req, res) => {
            const body = req.body;

            model.get.board_cnt(body, cnt => {
              const result = { cnt : cnt }
              res.send(result)
            })
        },
        board_data : (req, res) => {
            const body = req.body;
    
            model.get.board_data(body, data => {
              const result = { data : data }
              res.send(result)
            })
        },
    },
}
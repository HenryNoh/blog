const sequelize = require('./models').sequelize;

const {
    Teacher,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

const {
    Admin
  } = require('./models');
sequelize.query('SET NAMES utf8;');

const {
    Board
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        getData : callback => {
            Teacher.findAll()
            .then( result => {callback(result)} )
            .catch( err => { throw err })
        },
        addData : (body,callback) => {
            Teacher.create({name : body.data})
            .then( result=>{callback(result)} )
            .catch( err=>{throw err })
        },
        modifyData : (body,callback) => {
            Teacher.update({ name : body.modify.name }, {
                where : { id : body.modify.id }
            })
            .then( result => { callback(result) })
            .catch( err => { throw err })
        },
        deleteData : (body,callback) => {
            Teacher.destroy({
                where : { id : body.delete.id }
            })
            .then( callback(true))
            .catch( err => { throw err })
        },
        searchInfo : (body, hash, callback) => {
            Admin.findAll({
                where : { [Op.and]: [{ user_id : body.id, password : hash }] }
            })
            .then(data =>{
                callback(data)
            })
            .catch(err => {
                throw (err);
            })
        },
    },
    add : {
        board : (body, callback) => {

            Board.create({
                title : body.title,
                contents : body.contents,
                date : new Date(86400000)
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    }
}
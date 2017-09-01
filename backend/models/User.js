const Sequelize = require('sequelize')
var bcrypt = require('bcrypt');
const db = require('../db')

const User = db.define('user',{
    email:{
        type:Sequelize.STRING(50),
        allowNull: false,
		validate: {
			notEmpty: true,
            isEmail: true,
			len: [1,255]
		}        
    },
	username: {
		type: Sequelize.STRING(50),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1,50]
		}
	},

    password:{
        type:Sequelize.VIRTUAL,
        allowNull:false,
        validate:{
            isLongEnough:function(val){
                if(val.length < 7){
                   throw new Error("You password is too short")
                }
            }
        }
    },
    password_hash:{
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
    create_at: Sequelize.DATE,
    update_at: Sequelize.DATE,
    confirmed: Sequelize.BOOLEAN,
},{
    freezeTableName: true,
	indexes: [{unique: true, fields: ['email']}],
	instanceMethods: {
		authenticate: function(value) {
			if (bcrypt.compareSync(value, this.password_hash))
				return this;
			else
				return false;
		}
	}  
});

var hasSecurePassword = function(user, options, callback) {
	if (user.password != user.password_confirmation) {
		throw new Error("Password confirmation doesn't match Password");
	}
	bcrypt.hash(user.get('password'), 10, function(err, hash) {
		if (err) return callback(err);
		user.set('password_hash', hash);
		return callback(null, options);
	});
};

User.beforeCreate(function(user, options, callback) {
	user.email = user.email.toLowerCase();
	if (user.password){
		hasSecurePassword(user, options, callback);
    }
	else{
		return callback(null, options);
    }
});

User.beforeUpdate(function(user, options, callback) {
	user.email = user.email.toLowerCase();
	if (user.password){
        user.update_at = new Date();
		hasSecurePassword(user, options, callback);
    }else{
		return callback(null, options);
    }
})

module.exports = User;


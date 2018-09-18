const User = require('./user.class');
function Admin(){
    User.apply(this, arguments);
    this.hasAccess = true;

}
module.exports = Admin;
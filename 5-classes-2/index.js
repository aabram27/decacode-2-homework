const User = require('./user.class');
const Admin = require('./admin.class');

let user = new User("Aleksey", "Abramchev");
let admin = new Admin("Ivan", "Ivanov");
user.login();
admin.login();

console.log(user);
console.log(admin);
function User (firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.hasAccess = false;
    this.isLoggedIn = false;
    
    this.login = function(){ this.isLoggedIn = this.hasAccess;};
    this.logout = function(){ this.isLoggedIn = false; };
}
module.exports = User;

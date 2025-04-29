class User {
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    displayUser(){
        console.log(`User:  ${this.username}`);
        console.log(`Password: ${this.password}`);
    }
}

const test = new User("test", "test");

test.displayUser();

module.exports = User;

class User {
    constructor(id, name, surname, username, password, birthday, gender, totalScore, botId, registerDate) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this.totalScore = totalScore;
        this.botId = botId;
        this.registerDate = registerDate;
    }
    getUserStats() {
        return `${this.name} is ${this.age} years old`;
    }
}
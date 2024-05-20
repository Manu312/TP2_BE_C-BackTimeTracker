const db = require('../config/db');

class User{
    constructor(username, password, email, role, fullName) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role || 'user'; // Rol predeterminado: 'user'
        this.full_name = fullName || ''; // Nombre completo opcional
    };

    static async getAllUsers() {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM users', (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    };
    static async getUserByUsername(username) {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results[0]);
          });
        });
    };
    static async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results[0]);
          });
        });
    };
    //TODO probarlo de aca para abajo
    static async createUser(user) {
        return new Promise((resolve, reject) => {
          db.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    };
    //TODO Update user
    static async updateUser(username, user) {
        return new Promise((resolve, reject) => {
          db.query('UPDATE users SET ? WHERE username = ?', [user, username], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    };
    //TODO Delete user
    static async deleteUser(username) {
        return new Promise((resolve, reject) => {
          db.query('DELETE FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    };
    //TODO delelte all users
    static async deleteAllUsers() {
        return new Promise((resolve, reject) => {
          db.query('DELETE FROM users', (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    };
    //TODO
    //Create 2 users one with role admin and other with role user
    static async createDefaultUsers() {
        return new Promise((resolve, reject) => {
          const admin = new User('admin', 'admin', 'admin@gmail.com', 'admin', 'Admin Admin');
            const user = new User('user', 'user', 'user@gmail.com', 'user', 'User User');
            db.query('INSERT INTO users SET ?', admin, (err, results) => {
                if (err) {
                    return reject(err);
                }
            });
            db.query('INSERT INTO users SET ?', user, (err, results) => {
                if (err) {
                    return reject(err);
                }
            });
            resolve();
        });
    };
}


module.exports = User;
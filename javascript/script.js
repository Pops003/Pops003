let db;

async function initDatabase() {
    const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`,
    });
    db = new SQL.Database();
    const savedDB = localStorage.getItem("sqliteDB");

    if (savedDB) {
        // Load the database from localStorage
        console.log("Loading database from localStorage...");
        const binaryArray = new Uint8Array(JSON.parse(savedDB));
        db = new SQL.Database(binaryArray);
        console.log('Database loaded');
    } else {
        // Create a new database if none exists and save to localstorage
        console.log("Creating a new database...");
        db = new SQL.Database();
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
        saveToLocalStorage()
        console.log('Database saved to localstorage');
    }
    // console.log('Database initialized');
}

function saveToLocalStorage() {
    const binaryArray = db.export();
    localStorage.setItem("sqliteDB", JSON.stringify(Array.from(binaryArray)));
}
  
// Load database from localStorage
async function loadFromLocalStorage() {
    const savedDB = localStorage.getItem("sqliteDB");
    if (savedDB) {
      const SQL = await initSqlJs();
      db = new SQL.Database(new Uint8Array(JSON.parse(savedDB)));
    }
}

function registerUser() {
    const firstname = document.getElementById('first-name').value;
    const lastname = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        db.run('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname, email, password]);
        saveToLocalStorage();
        window.location.href = "/pages/Shoes.html";
    } catch (err) {
        if (err.message.includes('UNIQUE')) {
            const alertBox = document.getElementById('alert');
            alertBox.style.display = 'block';
        } else {
            console.error(err);
            alert('An error occurred.');
        }
    }
}

function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const query = db.exec('SELECT * FROM users where email = ? AND password= ?', [email, password])

    if (query.length > 0) {
        window.location.href = "/pages/Shoes.html";
    } else {
        const alertBox = document.getElementById('alert');
        alertBox.style.display = 'block';
    }
}

// Initialize the database on page load
initDatabase();

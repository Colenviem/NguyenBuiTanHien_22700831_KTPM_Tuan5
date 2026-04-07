const mysql = require('mysql2');
const express = require('express');
const app = express();

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'password123',
    database: 'test_db'
};

let connection; 

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.log('Đang đợi MySQL khởi động... Thử lại sau 5 giây.');
            setTimeout(handleDisconnect, 5000);
        } else {
            console.log('Kết nối MySQL thành công!');
        }
    });

    connection.on('error', (err) => {
        console.log('Lỗi DB:', err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.get('/', (req, res) => {
    connection.query('SELECT "Hello from MySQL!" AS message', (err, results) => {
        if (err) {
            res.status(500).send("Lỗi kết nối database, vui lòng thử lại sau.");
        } else {
            res.send(results[0].message);
        }
    });
});

app.listen(3000, () => console.log('App running on port 3000'));
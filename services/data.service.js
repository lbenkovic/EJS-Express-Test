const fs = require('fs');
const path = require('path');

class Data {
    getData() {
        const dataFilePath = path.join(__dirname, '../data.json');

        try {
            const data = fs.readFileSync(dataFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading data file:', error);
            return [];
        }
    }
}

module.exports = Data;
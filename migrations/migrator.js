const collection = require('./collections');
const fs = require('fs');
const writeFile = async (file, data) => fs.writeFileSync(file, JSON.stringify(data));
const readFile = async (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const storage = (file) => `./migrations/backup/${file}.json`;
const migrator = {
    backup: async (collection, file) => {
        await writeFile(storage(file), await collection.find());
    },
    migrate: async (collection, file) => {
        await collection.insertMany(await readFile(storage(file)));
    }
}
const backup = async () => {
    await migrator.backup(collection.product, "products");
}
const migrate = async () => {
    await migrator.migrate(collection.product, "products");
}
module.exports = { backup, migrate }
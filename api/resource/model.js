// build your `Resource` model here
const db = require('../../data/dbConfig');

function get() {
    return db('resources')
}

async function create(resource) {
    const [resource_id] = await db('resources').insert(resource);
    return get().where({ resource_id }).first();
}

module.exports = {
    get,
    create
}
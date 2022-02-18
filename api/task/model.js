// build your `Task` model here
const db = require('../../data/dbConfig');

function get() {
    return db('tasks')
}

async function create(task) {
    const [task_id] = await db('tasks').insert(task);
    return get().where({ task_id }).first();
}

module.exports = {
    get, 
    create
}
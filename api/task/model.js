// build your `Task` model here
const db = require('../../data/dbConfig');

// select t.*, p.project_name, p.project_description from tasks as t
// join projects as p on p.project_id = t.project_id
// where t.task_id = 1
function get() {
    return db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
}

async function create(task) {
    const [task_id] = await db('tasks').insert(task);
    return get().where({ task_id }).first();
}

module.exports = {
    get, 
    create
}
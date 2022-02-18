// build your `Task` model here
const db = require('../../data/dbConfig');

// select t.*, p.project_name, p.project_description from tasks as t
// join projects as p on p.project_id = t.project_id
// where t.task_id = 1
async function get() {
    const rows = await db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')

    const results = [];

    rows.forEach((row) => {
        if(row.task_completed === 0) {
            row.task_completed = false;
        } else {
            row.task_completed = true;
        }
        results.push(row);
    });
    return results
}

async function create(task) {
    const [task_id] = await db('tasks').insert(task);
    const row = await db('tasks') 
    .where({ task_id })
    .first();
    
    const result = {
        task_id: row.task_id,
        task_description: row.task_description,
        task_notes: row.task_notes,
        task_completed: row.task_completed ? true : false,
        project_name: row.project_name,
        project_description: row.project_description
    }
    return result;
}

module.exports = {
    get, 
    create
}
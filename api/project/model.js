// build your `Project` model here
const db = require('../../data/dbConfig');
 
//select project_name, project_description, project_completed from projects;
async function get() {
    const rows = await db('projects')
    .select('project_name', 'project_description', 'project_completed')
   
    const results = [];

    rows.forEach((row) => {
        if(row.project_completed === 1) {
            row.project_completed = true;
        } else {
            row.project_completed = false;
        }
        results.push(row);
    });
    return results
}

async function create(project) {
    const [project_id] = await db('projects').insert(project);
    const row = await db('projects')
        .where({ project_id })
        .first();

    const result = {
        project_id: row.project_id,
        project_name: row.project_name,
        project_description: row.project_description,
        project_completed: row.project_completed ? true : false,
    }

    return result;
}


module.exports = {
    get,
    create
}

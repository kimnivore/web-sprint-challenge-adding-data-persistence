// build your `Project` model here
const db = require('../../data/dbConfig');

function get() {
    return db('projects')
}

async function create(project) {
   const [project_id] = await db('projects').insert(project);
   return get().where({ project_id }).first();
}

module.exports = {
    get,
    create
}
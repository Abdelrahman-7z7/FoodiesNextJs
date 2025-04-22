import sql from 'better-sqlite3'

const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // .run() is used when we try to INSERT data not to FETCH, in Fetching data we use .all(), and in case for getting one row (id case) we use .get()
    return db.prepare('SELECT * FROM meals').all()
}
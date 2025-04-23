import sql from 'better-sqlite3'

const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 5000))
    // .run() is used when we try to INSERT data not to FETCH, in Fetching data we use .all(), and in case for getting one row (id case) we use .get()

    // throw new Error('Loading meals failed!!!')
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug){
    // return db.prepare('SELECT * FROM meals WHERE slug = '+ slug) ==> we could do that but we will open the website for SQL-Injection attack
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}
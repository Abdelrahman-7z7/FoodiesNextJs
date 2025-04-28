import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // .run() is used when we try to INSERT data not to FETCH, in Fetching data we use .all(), and in case for getting one row (id case) we use .get()

    // throw new Error('Loading meals failed!!!')
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug){
    // return db.prepare('SELECT * FROM meals WHERE slug = '+ slug) ==> we could do that but we will open the website for SQL-Injection attack
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower:true});
    meal.instructions = xss(meal.instructions);

    //TODO: preparing image to be saved in public/images folder
    
    //1-extracting the .png/.jpeg
    const extension = meal.image.name.split('.').pop();

    //2- generate a unique file name
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`)

    const bufferImege = await meal.image.arrayBuffer(); //return an array buffer but we need only of typed buffer

    //will be waiting for a chunk buffer which can be obtained by the meal.image
    stream.write(Buffer.from(bufferImege), (error) => {
        if(error){
            throw new Error('Saving image failed')
        }
    })

    //we will save the path of the image
    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}
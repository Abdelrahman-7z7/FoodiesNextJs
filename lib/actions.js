'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

//when we try to add a server action of CRUD operations we follow the next
//when the form gets uploaded the formData prop will be passed to the shareMeal function containing the form data

function isInvalid(text){
    return !text || text.trim() === ' ' 
}

//useActionState now will pass two parameters to the shareMeal when it executes when the form gets submitted, so the first parameter will be the previous state, so we have to accept it
export async function shareMeal(prevState, formData){

    //sanitizing data for blocking SQL-INJECTION
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if(
        isInvalid(meal.title) ||
        isInvalid(meal.summary) ||
        isInvalid(meal.instructions) ||
        isInvalid(meal.creator) ||
        isInvalid(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ){
        return {
            message: `
                Invalid input...
                1 ${isInvalid(meal.title)},    
                2 ${isInvalid(meal.summary)},   
                3 ${isInvalid(meal.instructions)},    
                4 ${isInvalid(meal.creator)},    
                5 ${isInvalid(meal.creator_email)},    
                6 ${!meal.creator_email.includes('@')},
                7 ${!meal.image || meal.image.size === 0}  
            `
        };
    }

    // console.log(meal)
    await saveMeal(meal)

    //this function tells NextJS to revalidate the cache that belongs to a certain route path 
    //only the provided path will be revalidate it, NO NESTED PATH
    //for adding 'layout' as an option (layout wraps all nested routes) all nested routes will be revalidated it 
    // revalidatePath('/meals', 'layout')
    revalidatePath('/meals')

    //if you want to revalidate all the website pages you can do that
    // revalidatePath('/', 'layout')

    redirect('/meals')
}   
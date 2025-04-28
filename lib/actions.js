'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

//when we try to add a server action of CRUD operations we follow the next
//when the form gets uploaded the formData prop will be passed to the shareMeal function containing the form data
export async function shareMeal(formData){

    //sanitizing data for blocking SQL-INJECTION
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    // console.log(meal)
    await saveMeal(meal)

    redirect('/meals')
}   
import Link from 'next/link'
import { Suspense } from 'react';

import classes from './page.module.css'
import MealsGrid from '@/components/meals/meal-grid'
import { getMeals } from '@/lib/meals'


export const metadata = {
    title: 'All meals',
    description: 'Delicious meals, shared by a food-loving community.',
};


async function Meals(){
    const meals = await getMeals();

    return (
        <>    
            {/* we are setting the meals array to empty till we fill it with something later */}
            <MealsGrid meals={meals}></MealsGrid>
        </>
    )
}

export default function MealsPage(){

    return(
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose you favorite recipe and cook it yourself. It is easy and fun! 
                </p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>
                        Share You Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                {/* suspense is a react components provided for handling loading state */}
                <Suspense fallback={
                    <p className={classes.loading}>
                        Fetching Meals...
                    </p>
                }>
                    <Meals/>
                </Suspense>
            </main>
        </>
    )
}
'use client';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';

import MealsFormSubmit from '@/components/meals/meal-form-submit';
import { useFormState } from 'react-dom';
// import {useFormStatus } from 'react-dom';


export default function ShareMealPage() {

    //we add the shareMeal to handle server actions but this action might have an error, so to handle that error we can use useFormState hook, and use it instead of the shareMeal action
    const [state, formAction] = useFormState(shareMeal, {message: null})

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          {/* we must sit the right name and label for the image to be used later in the fromData */}
          <ImagePicker label="Your image" name="image"></ImagePicker>
          {
            state.message && <p>{state.message}</p>
          }
          <p className={classes.actions}>
            <MealsFormSubmit/>
          </p>
        </form>
      </main>
    </>
  );
}
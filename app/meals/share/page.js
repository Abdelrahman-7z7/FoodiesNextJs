import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';

export default function ShareMealPage() {

    //when we try to add a server action of CRUD operations we follow the next
    //when the form gets uploaded the formData prop will be passed to the shareMeal function containing the form data
    async function shareMeal(formData){
        'use server';

        //sanitizing data for blocking SQL-INJECTION
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        }

        console.log(meal)
    }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMeal}>
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
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
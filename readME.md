# 🍽️ Foodies - NextLevel Food for NextLevel Foodies

Foodies is a full-stack web application built with **Next.js App Router** and **SQLite**, designed for food lovers to share and explore unique meals and recipes. It provides an engaging community platform where users can showcase their culinary creations, discover new dishes, and interact with fellow foodies.

---

## 🚀 Features

### 🌐 Pages and Routes

- **Home Page (`/`)**
  - Introduction to the Foodies project.
  - Includes a hero section with the app's purpose.
  - Two main actions:
    - **Join the Community** → `/community`
    - **Explore Meals** → `/meals`
  - Includes a dynamic slideshow with engaging images.

- **Community Page (`/community`)**
  - Static route displaying images and information about the Foodies community.

- **Meals Page (`/meals`)**
  - Displays a grid of shared meals.
  - Each meal shows title, summary, and publisher thoughts.
  - Contains a button to **share a new meal** → `/meals/share`
  - Each meal links to its detail page.

- **Meal Detail Page (`/meals/[mealsSlug]`)**
  - Shows complete details of a meal:
    - Title, summary, instructions (with formatting), publisher name & email, and an image.

- **Share Meal Page (`/meals/share`)**
  - Form for submitting a new meal.
  - Validations on all fields to ensure quality and prevent malformed submissions.
  - Image upload and preview using a custom component.
  - Image stored in the `/public/images` folder.

---

## 🧩 Components Structure

### 🔗 Navigation & Layout

- `components/main-header/`
  - `main-header.js`: Navbar with logo and navigation buttons.
  - `main-header-background.js`: Background styling for the header.
  - `nav-link.js`: Handles client-side navigation with active link styling.

### 🖼️ Home Page

- `components/images/`: Slideshow for landing visuals.

### 🍲 Meals System

- `components/meals/`
  - `meal-grid.js`: Displays meal items in a responsive grid.
  - `meal-item.js`: Component for rendering individual meal cards.
  - `meal-form-submit.js`: Submit button used in meal sharing form.
  - `image-picker.js`: Shows a preview of the selected image before submitting.

---

## 🗃️ Database & Backend Logic

### 📁 `/lib/meals.js`

- Handles core database operations using `better-sqlite3`:
  - `getMeals()` — Fetch all meals.
  - `getMeal(slug)` — Fetch a single meal by slug.
  - `saveMeal(meal)` — Save a new meal with:
    - XSS protection using `xss`
    - Unique slug generation using `slugify`
    - Image buffer storage to `/public/images`

### 📁 `/lib/actions.js`

- Server-side logic for handling meal form submission via `useActionState`.
- Sanitizes inputs and handles validation.
- Uses `redirect()` and `revalidatePath()` to control routing and caching.

---

## 🛠️ Database Initialization

### 📁 `/initdb.js`

- Initializes the SQLite database (`meals.db`).
- Creates the `meals` table.
- Seeds the database with dummy meal data like "Fresh Tomato Salad".

---

## 🧪 Validation

Server-side validation ensures:
- Required fields are not empty or blank.
- Valid email format.
- Image file must be uploaded.
- Uses `.trim()` and character checks to ensure clean input.

---

## 📦 Technologies Used

- **Next.js (App Router)**
- **SQLite** via `better-sqlite3`
- **Server Actions** (`'use server'`)
- **Form Data API** & `useActionState`
- **Slugify** for URL-friendly slugs
- **XSS** for content sanitization
- **Node.js `fs`** module for file handling
- **CSS Modules** for scoped styling

---

## 💡 How It Works

1. Users explore meals via `/meals`.
2. To share a meal, they navigate to `/meals/share`, fill out the form, and upload an image.
3. The backend saves data and image securely, regenerates cache, and redirects to `/meals`.
4. Clicking any meal leads to its full detail view via `/meals/[slug]`.

---

## 📸 Screenshots

> _(You can add actual images here if you want)_

- ✅ Home Page with Hero Section
- ✅ Meals Gallery
- ✅ Meal Detail View
- ✅ Share Meal Form with Validation
- ✅ Community Showcase

---

## 📁 Folder Structure Overview


---

# Meals App

This is a simple full-stack meals sharing application built using **Next.js**, **SQLite**, and **server actions**. Users can view, add, and share meals.

---

## 📦 Features

- List and view meal details
- Submit new meals using a form with image upload
- Server-side validation and sanitization
- Image saving using the Node.js `fs` module
- Prevents SQL Injection with parameterized queries

---

## 🗃️ Database Schema (SQLite)

```sql
CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  summary TEXT NOT NULL,
  instructions TEXT NOT NULL,
  creator TEXT NOT NULL,
  creator_email TEXT NOT NULL
);
```

---

## 🖼️ Image Upload Component (Client Side)

```jsx
'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return setPickedImage(null);

    const reader = new FileReader();
    reader.onload = () => setPickedImage(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label htmlFor="image">{label}</label>
      <div>
        {!pickedImage ? <p>No image picked yet.</p> :
        <Image src={pickedImage} alt="Selected image" fill />}
      </div>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        ref={imageInput}
        onChange={handleImageChange}
        required
      />
      <button type="button" onClick={handlePickClick}>Pick an Image</button>
    </div>
  );
}
```

---

## 💾 Saving Meals (Server Side)

```js
import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const buffer = await meal.image.arrayBuffer();
  stream.write(Buffer.from(buffer), (err) => {
    if (err) throw new Error('Saving image failed');
  });

  meal.image = `/images/${fileName}`;
  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title, @summary, @instructions,
      @creator, @creator_email, @image, @slug
    )
  `).run(meal);
}
```

---

## 📤 Server Action - Share Meal

```js
'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalid(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) {
    return { message: 'Invalid input...' };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}
```

---

## 🥗 Dummy Meals Insert Script

```js
const db = require('better-sqlite3')('meals.db');

const dummyMeals = [ /* array of meals */ ];

db.prepare(`
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
  )
`).run();

async function initData() {
  const stmt = db.prepare(`
    INSERT INTO meals VALUES (
      null, @slug, @title, @image,
      @summary, @instructions,
      @creator, @creator_email
    )
  `);
  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}
initData();
```

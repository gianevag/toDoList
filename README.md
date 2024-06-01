ToDoList is a proof-of-concept project that demonstrates the use of the Next.js framework with TypeScript. The project is a simple to-do list application that allows users to add, edit, and delete tasks in the "To Do," "Doing," or "Done" lists.

Demo: [ToDoList](https://to-do-list-gamma-dusky.vercel.app/)

### User Stories 📋

---

As a user, I want to: 

- Add, edit, and delete a task.
- Mark a task as "To Do," "Doing," or "Done."
- Change the order of the tasks within a list or between lists.
- Persist the task state when the page is refreshed.

### Technologies 💻

---

In this project, I used the following technologies:

- [Next.js](https://nextjs.org/) - Fullstack React framework.
- [dndKit](https://dndkit.com/) - Drag and Drop library.
- [shadcn](https://ui.shadcn.com/) - Component library.
- [TailwindCSS](https://tailwindcss.com/) - CSS framework.


#### Next.js

I used Next.js with typescript template and found the following props and cons of Next.js:

**Pros:**
- Create folder-base routing for creating and updating task.
- Provides server-side rendering out of the box for the main page.
- Easily integrates with Vercel storage for persisting the task state.
- Facilitates fetching and mutating data using server actions.
- Offers great documentation with examples.
- Has strong community support.

**Cons:**
- It was difficult to understand the parallel and intercepting routing to create modals with shareable links.
- Debugging the client and server-side code was challenging.

#### DndKit

I used dndKit for drag-and-drop functionality between and across lists. I found the following pros and cons of dndKit:

**Pros:**
- Easy-to-use sortable functionality to change the order of tasks.
- Comprehensive documentation that explains the library's base concepts.
- Supports TypeScript for a better development experience.
- Provides Storybook documentation with many examples.

**Cons:**
- Did not provide the code for the examples; it was found on CodeSandbox.
- The example code for sortable functionality between two droppable containers was hard to understand.
- Using the DragOverlay component caused a memory leak issue.

#### Shadcn

I used shadcn component library for UI elements like buttons, inputs, and modals. I found the following pros and cons of shadcn:

**Pros:**
- Easy to use and understand the components.
- Includes many UI components.
- The concept of copy-paste components is very flexible.
- Offers block components and supports theming.
- Easily integrates with Next.js projects.

**Cons:** 
- Poor documentation; I had to read the component code to understand the props and usage.
- Lacks many examples of the components.

#### TailwindCSS

I used tailwindCSS only for layout styling and found the following pros and cons of tailwindCSS:

**Pros:**
- Easy to understand the framework's base concepts.
- Convenient classes for styling.
- Well-organized documentation with examples.
- Supports theming and customizing the classes.

**Cons:**
- Using many classes can make the UI element look messy. Tools like `clsx` and `cva` are needed to make the code more readable.
- There is a learning curve for remembering the classes and their usage.


| Name        | Documentation | Examples | Learning curve | My experience  |
|-------------|:-------------:|:--------:|:--------------:|:--------------:|
| Next.js     |      7/10     |   8/10   |      5/10      |      8/10      |
| dndkit      |      8/10     |   7/10   |      3/10      |      6/10      |
| shadcn      |      7/10     |   4/10   |      9/10      |      8/10      |
| tailwindCSS |      9/10     |   9/10   |      3/10      |      8/10      |


### Installation 🔧

---

To run the project locally, you need to follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/gianevag/toDoList.git
cd toDoList
```

2. Install the dependencies using pnpm or npm:

```bash
pnpm install
or
npm install
```

3. Create a vercel storage and copy paste the environment variables in the `.env`:

```bash
POSTGRES_URL="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_PRISMA_URL="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_URL_NO_SSL="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_URL_NON_POOLING="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_USER="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_HOST="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_PASSWORD="XXXXXXXXXXXXXXXXXXXX"
POSTGRES_DATABASE="XXXXXXXXXXXXXXXXXXXX"
```

4. Seed the database to create the task table and add some tasks to the table:

```bash
npm run seed
```

5. Run the project:

```bash
npm run dev
```

6. Navigate to `http://localhost:3000` to see the project running.

### Conclusion 🎉

---

In conclusion, I found this simple project both challenging and interesting. I learned a lot of new things and technologies. The Next.js framework proved to be powerful with its server rendering and server actions. The dndKit library has great documentation, but I found developing cross-listing drag-and-drop functionality very difficult. The shadcn component library was surprisingly flexible with its component generator, and the TailwindCSS framework was easy to use and understand, despite its high learning curve.
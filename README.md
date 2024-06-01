ToDoList is a proof of concept project to demonstrate the use of NextJS framework with TypeScript. The project is a simple to-do list application that allows users to add, edit, and delete tasks to toDo, doing or done list. 

Demo: [ToDoList](https://to-do-list-gamma-dusky.vercel.app/)

### User Stories 📋

---

As a user, I want to: 

- Be able to add, edit and delete a task.
- Be able to mark a task as toDo, doing or done.
- Change the order of the tasks in the list or between the lists.
- Persist the tasks state when the page is refreshed.


### Technologies 💻

---

In this project, I used the following technologies:

- [Next.js](https://nextjs.org/) - Fullstack React framework.
- [dndKit](https://dndkit.com/) - Drag and Drop library.
- [shadcn](https://ui.shadcn.com/) - Component library.
- [TailwindCSS](https://tailwindcss.com/) - CSS framework.


#### Next.js

I used Next.js with typescript template and I found the following props and cons of Next.js:

**Pros:**
- create folder-base routing for create and update task.
- server-side redering out of the box for the main page.
- easy integration with vercel storage for persisting the tasks state.
- fetching and mutating data using server actions.
- great documentation with examples
- community support

**Cons:**
- it was difficult to understand the parallel and intercepting routing in order to make modal with shareable links.
- It was difficult to debugg the client and server side code. 

#### DndKit

I used dndKit for drag and drop functionality between and across the lists. I found the following pros and cons of dndKit:

**Pros:**
- easy use sortable functionality in order to change the order of the tasks.
- understand the base concept of the library from documentation.
- support typescript for better development experience.
- storybook documentation with a lot of examples.

**Cons:**
- it not provided the code of the examples and found it to the codesandbox.
- it was realy difficult to understand the example code for sortable functionality between two droppable containers.
- when use DragOverlay component I have memory leak issue.

#### Shadcn

I used shadcn component library for UI elements like buttons, inputs, and modals. I found the following pros and cons of shadcn:

**Pros:**
- easy to use and understand the components.
- has a lot of UI components.
- found really flexible the concept of copy paste components.
- has blocks components and support theming.
- easy to integration with next.js project.

**Cons:** 
- poor documentation, I should read the component code to understand the props and usage.
- not many examples of the components.

#### TailwindCSS

I used tailwindCSS only for layout styling and found the following pros and cons of tailwindCSS:

**Pros:**
- easy to understand the base concept of the framework.
- easy to use the classes for styling.
- well organized documentation with examples.
- support theming and customizing the classes.

**Cons:**
- when use a lot of classes then the UI element looks like a mess. And you should use tools like `clsx` and `cva` to make the code more readable.
- learning curve for remembering the classes and their usage.


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

4. Seed the database in order to create the task table and add some tasks to the table.:

```bash
node run ./scripts/seed.js
```

5. Run the project:

```bash
npm run dev
```

6. Navigate to `http://localhost:3000` to see the project running.

### Conclusion 🎉

---

As conclusion, I found this simple project really challenging and interesting. I learned a lot of new things and technologies. I found the Next.js framework really powerful using server rendering and server actions. The dndKit library has a great documentation but I found really difficult to develop the cross listing drag and drop. The shadcn component library was surprisly flexible with component generator and the tailwindCSS framework was easy to use and understand, but the learning curve was high.
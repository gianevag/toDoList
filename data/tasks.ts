"use server"

import { sql } from '@vercel/postgres';
import { Containers, Task, Tasks } from "definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod'

export const fetchTasks = async () => {

    noStore()

    try {
        const { rows } = await sql<Task>`SELECT * FROM tasks order by order_task asc`;
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch tasks data.');
    }

}
 

export const fetchTask = async (id: string) => { 
        if (!id) {
            return null;
        }
    
        try {
            const { rows } = await sql<Task>`SELECT * FROM tasks WHERE id = ${id}`;
            return rows[0];
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch task data.');
        }
}


export const reorderTasks =  async (tasks: Tasks) => { 

    const reorderTasks = Object.keys(tasks).map((container) => { 
        return tasks[container as Containers].map((task, idx) => { 
            return {
                ...task,
                order_task: idx + 1,
                type: container
            }
        })
    }).flat()

    try {
         await Promise.all(reorderTasks.map(task => { 
         sql`
            UPDATE tasks
            SET   order_task  = ${task.order_task},
                  type        = ${task.type}
            WHERE id          = ${task.id}
        `
        }))
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch tasks data.');
    }

} 


const FormDataSchema = z.object({
    id: z.string(),
    title: z.string().trim().min(1, {
        message: 'Task name is required',
    }),
    description: z.string(),
    type: z.string(),
})

const CreateFormDataSchema = FormDataSchema.omit({ id: true, type: true})
const UpdateFormDataSchema = FormDataSchema.omit({ id: true, type: true})

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
  },
  message?: string | null;
};

export const createTask = async (prevState: State, formData: FormData) => { 
    const validatedFields = CreateFormDataSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
            message: null
        }
    }

    const { title, description } = validatedFields.data;

    try {
        await sql`
            INSERT INTO tasks (title, description, type, order_task)
            SELECT ${title}, ${description}, 'todo', COALESCE(MAX(order_task), 0) + 1
            FROM tasks
            WHERE type = 'todo'
        `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/'); // clear cache and refetch
    redirect('/'); // redirect to another page
}

export const updateTask = async (id: string, prevState: State, formData: FormData) => {
    const validatedFields = UpdateFormDataSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error?.flatten().fieldErrors,
            message: null
        }
    }

    const { title, description } = validatedFields.data;

    try {
        await sql`
            UPDATE tasks
            SET title = ${title}, description = ${description}
            WHERE id = ${id}
        `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Task.',
        };
    }

    revalidatePath('/'); // clear cache and refetch
    redirect('/'); // redirect to another page
}

export const deleteTask = async (id: string) => { 
    console.log("deleteTask", id);
    
    if (!id) {
        return {
            message: "Invalid Task ID."
        }
    }

    try {
        await sql`
            DELETE FROM tasks
            WHERE id = ${id}
        `
        revalidatePath('/');
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

     // clear cache and refetch
    
}
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
    title: z.string().trim().min(1, {
        message: 'Task name is required',
    }),
    description: z.string()
})


export type State = {
  errors?: {
    title?: string[];
    description?: string[];
  },
  message?: string | null;
};

export const createTask = async (prevState: State, formData: FormData) => { 
    const validatedFields = FormDataSchema.safeParse(Object.fromEntries(formData));

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
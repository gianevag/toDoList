"use server"

import { sql } from '@vercel/postgres';
import { Containers, Task, Tasks } from "definitions";

export const fetchTasks = async () => {

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
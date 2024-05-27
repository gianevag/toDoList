const { db } = require('@vercel/postgres');
const { tasks } = require("../lib/data.js");

const seedTask = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255)
      );
    `;

    console.log(`Created "tasks" table`);


   const queries = Object.keys(tasks).map((taskType) => {
        return tasks[taskType].map((task) => {
          return {taskType, title: task?.title, description: task?.description || null}
        });
      });

  
    // Insert data into the "tasks" table
    await Promise.all(queries.flat().map((query) => {
      return client.sql`INSERT INTO tasks (type, title, description)
            VALUES (${query.taskType}, ${query?.title}, ${query?.description});`;
    }));

    console.log("Seeded tasks")

  } catch (error) {
    console.error("Error seeding tasks:", error);
    throw error;
  }
};

async function main() {
  const client = await db.connect();

  await seedTask(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
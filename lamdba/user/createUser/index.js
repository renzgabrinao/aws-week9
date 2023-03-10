import pg from "pg";

const { Pool } = pg;

let pool;

async function createUser(id, display_name) {
  // begin transaction
  await pool.query("BEGIN");

  // create query
  const query = {
    text: "INSERT INTO users (id, display_name) VALUES ($1, $2) RETURNING id",
    values: [id, display_name],
  };

  // insert data
  const res = await pool.query(query);

  // commit transaction
  await pool.query("COMMIT");

  const response = {
    statusCode: 201,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: "created user in db!" }),
  };
  return response;
}

export const handler = async (event) => {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      application_name: "",
      max: 1,
    });
  }

  const body = JSON.parse(event.body);

  await createUser(body.id, body.name);
};

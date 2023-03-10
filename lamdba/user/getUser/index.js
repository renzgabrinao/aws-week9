import pg from "pg";

const { Pool } = pg;

let pool;

async function getUser(user_id) {
  // create query
  const query = {
    text: "SELECT * FROM users WHERE id = ($1)",
    values: [user_id],
  };

  // grab data
  const res = await pool.query(query);

  const response = {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(res.rows),
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

  return await getUser(body.id);
};

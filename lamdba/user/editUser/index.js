import pg from "pg";

const { Pool } = pg;

let pool;

async function editUser(bio, id) {
  // begin transaction
  await pool.query("BEGIN");

  // create query
  const query = {
    text: "UPDATE users SET bio = ($1) WHERE id = ($2)",
    values: [bio, id],
  };

  // insert data
  const res = await pool.query(query);

  // commit transaction
  await pool.query("COMMIT");

  const response = {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: "updated user in db!" }),
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
  const userId = event.requestContext.authorizer.jwt.claims.sub;

  return await editUser(body.bio, userId);
};

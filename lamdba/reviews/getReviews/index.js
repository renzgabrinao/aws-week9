import pg from "pg";

const { Pool } = pg;

let pool;

async function getReviews(id) {
  // create query
  const query = {
    text: "SELECT * FROM reviews WHERE user_uuid = ($1)",
    values: [id],
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

  const user_id = event.requestContext.authorizer.jwt.claims.sub;

  return await getReviews(user_id);
};

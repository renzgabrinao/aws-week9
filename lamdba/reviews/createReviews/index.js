import pg from "pg";

const { Pool } = pg;

let pool;

async function createReview(user_id, title, review, rating) {
  // begin transaction
  await pool.query("BEGIN");

  // create query
  const query = {
    text: "INSERT INTO reviews (user_uuid, title, review, rating) VALUES ($1, $2, $3, $4) RETURNING id",
    values: [user_id, title, review, rating],
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
    body: JSON.stringify({ message: "posted review in db!" }),
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
  const body = JSON.parse(event.body);

  return await createReview(user_id, body.title, body.review, body.rating);
};

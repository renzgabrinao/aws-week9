import pg from "pg";

const { Pool } = pg;

let pool;

async function deleteReview(review_id) {
  // begin transaction
  await pool.query("BEGIN");

  // create query
  const query = {
    text: "DELETE FROM reviews WHERE id = ($1)",
    values: [review_id],
  };

  // insert data
  await pool.query(query);

  // commit transaction
  await pool.query("COMMIT");

  const response = {
    statusCode: 201,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: "deleted review from db!" }),
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

  return await deleteReview(body.review_id);
};

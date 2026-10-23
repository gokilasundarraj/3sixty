import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const FAKE_REVIEW_EMAILS = [
  'karthik.raja@psgtech.ac.in',
  'praveen.ece@cit.edu.in',
  'ananya.media@gmail.com'
];

async function cleanup() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/3sixty_db';
  console.log('[DB] Connecting to:', mongoUri);
  await mongoose.connect(mongoUri);

  const reviewsCollection = mongoose.connection.db.collection('reviews');
  const allReviews = await reviewsCollection.find({}).toArray();
  console.log(`[DB] Found ${allReviews.length} total reviews in database.`);

  for (const r of allReviews) {
    console.log(`- Review: ID=${r._id}, user=${r.userName}, email=${r.userEmail}, rating=${r.rating}`);
  }

  // Delete fake seed reviews and test run reviews
  const deleteResult = await reviewsCollection.deleteMany({
    $or: [
      { userEmail: { $in: FAKE_REVIEW_EMAILS } },
      { userEmail: { $regex: /student\.test/ } }
    ]
  });

  console.log(`[DB] Deleted ${deleteResult.deletedCount} fake seed reviews.`);

  const remaining = await reviewsCollection.find({}).toArray();
  console.log(`[DB] Remaining genuine reviews in DB: ${remaining.length}`);

  await mongoose.disconnect();
  console.log('[DB] Done.');
}

cleanup().catch(err => {
  console.error('[DB] Error during cleanup:', err);
  process.exit(1);
});

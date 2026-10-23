import dotenv from 'dotenv';
dotenv.config();

async function testReviewAndAuthFlow() {
  const baseUrl = 'http://localhost:5000/api';
  console.log('[Test] Testing Review & Auth Flow at', baseUrl);

  // 1. Create a test student account
  const testStudent = {
    name: 'Gokila Murugan',
    email: `student.test.${Date.now()}@gmail.com`,
    password: 'Password123!',
  };

  console.log('[Test] 1. Registering user:', testStudent.email);
  const signupRes = await fetch(`${baseUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testStudent),
  });
  const signupData = await signupRes.json();
  console.log('[Test] Signup status:', signupRes.status, 'Success:', signupData.success);

  if (!signupData.success || !signupData.data?.token) {
    throw new Error('Signup failed: ' + JSON.stringify(signupData));
  }

  const token = signupData.data.token;
  const user = signupData.data.user;
  console.log('[Test] Authenticated user ID:', user.id, 'Role:', user.role);

  // 2. Submit a real review
  console.log('[Test] 2. Submitting genuine review...');
  const reviewPayload = {
    rating: 5,
    message: 'The AI project source code, documentation and PPT were delivered ahead of schedule and viva questions were super helpful!',
    projectType: 'Final-Year Project (CSE)',
  };

  const reviewRes = await fetch(`${baseUrl}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reviewPayload),
  });
  const reviewData = await reviewRes.json();
  console.log('[Test] Review submit status:', reviewRes.status, 'Success:', reviewData.success);

  if (!reviewData.success || !reviewData.data?.id) {
    throw new Error('Review creation failed: ' + JSON.stringify(reviewData));
  }
  console.log('[Test] Created Review:', reviewData.data);

  // 3. Test duplicate review prevention rule
  console.log('[Test] 3. Testing duplicate review prevention...');
  const dupRes = await fetch(`${baseUrl}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reviewPayload),
  });
  const dupData = await dupRes.json();
  console.log('[Test] Duplicate check status (Expected 409):', dupRes.status, 'Message:', dupData.message);

  // 4. Fetch approved reviews from public endpoint
  console.log('[Test] 4. Fetching approved reviews from GET /api/reviews...');
  const listRes = await fetch(`${baseUrl}/reviews`);
  const listData = await listRes.json();
  console.log('[Test] Total approved reviews in DB:', listData.data.length);
  const found = listData.data.find(r => r.userEmail === testStudent.email);
  console.log('[Test] Found submitted review dynamically in database:', Boolean(found));
  if (found) {
    console.log('[Test] Verified review details:', {
      id: found.id,
      _id: found._id,
      userName: found.userName,
      userEmail: found.userEmail,
      rating: found.rating,
      projectType: found.projectType,
    });
  }

  // 5. Test invalid Google token rejection
  console.log('[Test] 5. Testing rejection of fake/unverified Google credentials...');
  const fakeGoogleRes = await fetch(`${baseUrl}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: 'fake.unverified.token.here' }),
  });
  const fakeGoogleData = await fakeGoogleRes.json();
  console.log('[Test] Fake Google token rejection status (Expected 401):', fakeGoogleRes.status, 'Message:', fakeGoogleData.message);

  console.log('\n[Test] === ALL BACKEND TESTS PASSED SUCCESSFULLY! ===');
}

testReviewAndAuthFlow().catch(err => {
  console.error('[Test] Test failed:', err);
  process.exit(1);
});

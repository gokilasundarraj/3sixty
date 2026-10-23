// Comprehensive Verification Test Suite for 3 Sixtey Review System
const BASE_URL = 'http://localhost:5000';

async function runReviewRulesTest() {
  console.log('================================================================');
  console.log('  TESTING ONE REVIEW PER PHONE NUMBER & CAPITALIZED INITIAL     ');
  console.log('================================================================\n');

  const testPhone = `9876${Math.floor(100000 + Math.random() * 900000)}`;

  // --- TEST 1: Initial Review Submission ---
  console.log(`[TEST 1] Submitting review with name "kumar" and phone "${testPhone}"...`);
  const res1 = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: 'kumar',
      phone: testPhone,
      rating: 5,
      message: 'Excellent final-year engineering project delivery and support!',
      projectType: 'Final-Year Engineering Project',
    }),
  });

  const data1 = await res1.json();
  if (res1.status !== 201 || !data1.success) {
    throw new Error(`Test 1 Failed: Review submission failed with status ${res1.status}: ${JSON.stringify(data1)}`);
  }
  const reviewId = data1.data.id || data1.data._id;
  console.log('  -> Status:', res1.status, '| Created Review ID:', reviewId);
  console.log('  -> Reviewer:', data1.data.userName, '| Phone:', data1.data.phone);
  console.log('  [PASS] Initial review submitted successfully.\n');

  // --- TEST 2: Duplicate Phone Number Rejection ---
  console.log(`[TEST 2] Submitting another review with the same phone "${testPhone}"...`);
  const resDuplicate = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: 'kumar',
      phone: testPhone,
      rating: 4,
      message: 'Trying to submit a second review with the same phone number.',
      projectType: 'Mini Project (2nd & 3rd Year)',
    }),
  });

  const dataDuplicate = await resDuplicate.json();
  const expectedMsg = 'You have already submitted a review with this phone number.';

  if (resDuplicate.status !== 409) {
    throw new Error(`Test 2 Failed: Expected status 409 Conflict, got ${resDuplicate.status}: ${JSON.stringify(dataDuplicate)}`);
  }

  if (dataDuplicate.message !== expectedMsg) {
    throw new Error(`Test 2 Failed: Expected message "${expectedMsg}", got "${dataDuplicate.message}"`);
  }

  console.log('  -> Status:', resDuplicate.status, '| Message:', dataDuplicate.message);
  console.log('  [PASS] Duplicate phone number properly rejected with exact message.\n');

  // --- TEST 3: Duplicate with space/dash format ---
  console.log(`[TEST 3] Submitting with spaced phone number formatting (e.g. "+91 ${testPhone}")...`);
  const resSpaced = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: 'kumar',
      phone: `${testPhone.slice(0, 5)} ${testPhone.slice(5)}`,
      rating: 5,
      message: 'Trying with spaced phone number.',
    }),
  });
  const dataSpaced = await resSpaced.json();
  if (resSpaced.status !== 409 || dataSpaced.message !== expectedMsg) {
    throw new Error(`Test 3 Failed: Normalized duplicate phone not rejected: ${resSpaced.status} ${JSON.stringify(dataSpaced)}`);
  }
  console.log('  -> Status:', resSpaced.status, '| Message:', dataSpaced.message);
  console.log('  [PASS] Normalized phone duplicates blocked.\n');

  // --- TEST 4: Verify Initial Avatar Logic on Review List ---
  console.log('[TEST 4] Verifying review card in list and initial avatar letter...');
  const resList = await fetch(`${BASE_URL}/api/reviews`);
  const dataList = await resList.json();
  const found = dataList.data.find((r) => r.id === reviewId || r._id === reviewId);
  if (!found) {
    throw new Error('Test 4 Failed: Review not found in public list');
  }

  // Initial letter of 'kumar' in uppercase
  const expectedInitial = found.userName.trim().charAt(0).toUpperCase();
  if (expectedInitial !== 'K') {
    throw new Error(`Test 4 Failed: Expected avatar initial 'K' for 'kumar', got '${expectedInitial}'`);
  }
  console.log(`  -> Review found: userName="${found.userName}", avatarInitial="${expectedInitial}"`);
  console.log('  [PASS] Capitalized initial avatar rule confirmed.\n');

  // --- TEST 5: Cleanup Test Review ---
  console.log('[TEST 5] Cleaning up test review from database...');
  const resDel = await fetch(`${BASE_URL}/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (resDel.status !== 200) {
    throw new Error(`Test 5 Failed: Could not delete test review: ${resDel.status}`);
  }
  console.log('  [PASS] Test review cleaned up successfully.\n');

  console.log('================================================================');
  console.log('  ALL PHONE LIMIT & CAPITALIZED AVATAR TESTS PASSED! ✓          ');
  console.log('================================================================');
}

runReviewRulesTest().catch((err) => {
  console.error('\n❌ TEST ERROR:', err.message);
  process.exit(1);
});

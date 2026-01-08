// Test file for Student Feedback Portal Backend
const http = require('http');

console.log('🧪 Running STFBP Backend Tests...\n');

const tests = [];
let passed = 0;
let failed = 0;

// Test 1: Check if server responds to /feedback endpoint
function testFeedbackEndpoint() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/feedback',
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Test 1 PASSED: GET /feedback responds with 200');
        passed++;
      } else {
        console.log(`❌ Test 1 FAILED: Expected 200, got ${res.statusCode}`);
        failed++;
      }
      resolve();
    });

    req.on('error', (err) => {
      console.log(`❌ Test 1 FAILED: ${err.message}`);
      console.log('   Make sure backend is running: node server.js');
      failed++;
      resolve();
    });

    req.end();
  });
}

// Test 2: Check database connection
function testDatabaseConnection() {
  return new Promise((resolve) => {
    const mysql = require('mysql2');
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'MyRootP@ssword123',
      database: 'stfbp'
    });

    db.connect((err) => {
      if (err) {
        console.log(`❌ Test 2 FAILED: Database connection error`);
        console.log(`   Error: ${err.message}`);
        failed++;
      } else {
        console.log('✅ Test 2 PASSED: MySQL database connected');
        passed++;
        db.end();
      }
      resolve();
    });
  });
}

// Test 3: Check if feedback table exists
function testFeedbackTable() {
  return new Promise((resolve) => {
    const mysql = require('mysql2');
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'MyRootP@ssword123',
      database: 'stfbp'
    });

    db.connect((err) => {
      if (err) {
        console.log(`❌ Test 3 FAILED: Cannot connect to database`);
        failed++;
        resolve();
        return;
      }

      db.query('DESCRIBE feedback', (error, results) => {
        if (error) {
          console.log(`❌ Test 3 FAILED: feedback table does not exist`);
          console.log(`   Create table with: CREATE TABLE feedback (id INT AUTO_INCREMENT PRIMARY KEY, student_name VARCHAR(255), message TEXT);`);
          failed++;
        } else {
          console.log('✅ Test 3 PASSED: feedback table exists');
          passed++;
        }
        db.end();
        resolve();
      });
    });
  });
}

// Run all tests
async function runTests() {
  console.log('Starting tests...\n');
  
  await testDatabaseConnection();
  await testFeedbackTable();
  
  // Give server a moment to start if needed
  await new Promise(resolve => setTimeout(resolve, 1000));
  await testFeedbackEndpoint();

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50) + '\n');

  if (failed === 0) {
    console.log('🎉 All tests passed! Your STFBP backend is ready.');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
    process.exit(1);
  }
}

runTests();

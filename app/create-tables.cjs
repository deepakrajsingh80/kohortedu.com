const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS decision_profiles (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      major VARCHAR(50),
      level ENUM('UG', 'PG', 'Diploma'),
      budget INT,
      ielts VARCHAR(10),
      pr_priority ENUM('High', 'Med', 'Low'),
      academic_score INT,
      work_exp ENUM('0', '0-1', '1-3', '3-5', '5+'),
      course_type VARCHAR(50),
      last_results JSON,
      last_computed_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS premium_subscriptions (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL UNIQUE,
      is_active BOOLEAN NOT NULL DEFAULT FALSE,
      plan ENUM('monthly', 'quarterly', 'yearly') DEFAULT 'monthly',
      amount INT,
      currency VARCHAR(10) DEFAULT 'INR',
      payment_id VARCHAR(255),
      payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
      started_at TIMESTAMP NULL,
      expires_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  
  console.log("SUCCESS: Tables decision_profiles and premium_subscriptions created!");
  await conn.end();
}
main().catch(e => { console.error("ERROR:", e.message); process.exit(1); });

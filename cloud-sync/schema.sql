CREATE TABLE IF NOT EXISTS form_state (id TEXT PRIMARY KEY CHECK(id='personal'), revision INTEGER NOT NULL DEFAULT 0, commit_id TEXT, previous_commit_id TEXT, chunk_count INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL DEFAULT 0);
INSERT OR IGNORE INTO form_state(id) VALUES ('personal');
CREATE TABLE IF NOT EXISTS form_chunks (commit_id TEXT NOT NULL, part INTEGER NOT NULL, ciphertext TEXT NOT NULL, PRIMARY KEY(commit_id,part));
CREATE TABLE IF NOT EXISTS form_auth_limits (key_hash TEXT NOT NULL, bucket INTEGER NOT NULL, failures INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(key_hash,bucket));

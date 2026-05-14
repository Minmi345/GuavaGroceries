CREATE TABLE IF NOT EXISTS receipts (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total NUMERIC(10,2) NOT NULL,
    currency VARCHAR(5) DEFAULT 'SEK',
    store_name VARCHAR(255) DEFAULT 'Unknown',
    date DATE
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    receipt_id VARCHAR(255) NOT NULL REFERENCES receipts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL
);

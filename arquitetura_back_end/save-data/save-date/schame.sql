CREATE TABLE IF NOT EXISTS supermarkets (
  cnpj TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL
);
    
CREATE TABLE IF NOT EXISTS products (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS price_history (
  id TEXT PRIMARY KEY,
  nfe_id TEXT NOT NULL,
  price DECIMAL NOT NULL,
  date TIMESTAMP NOT NULL,
  supermarket_id TEXT NOT NULL,
  product_id TEXT NOT NULL,

  CONSTRAINT fk_supermarket FOREIGN KEY (supermarket_id) REFERENCES supermarkets (cnpj) ON DELETE CASCADE,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products (code) ON DELETE CASCADE
);
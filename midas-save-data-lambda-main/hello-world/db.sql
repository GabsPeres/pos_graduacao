CREATE TABLE Supermarkets (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    state_registration VARCHAR(50),
    address_street VARCHAR(255),
    address_number VARCHAR(50),
    address_neighborhood VARCHAR(255),
    address_zip_code VARCHAR(20),
    address_city VARCHAR(255),
    address_state VARCHAR(2),
    address_lat DECIMAL(9, 6),
    address_lng DECIMAL(9, 6)
);

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(10) NOT NULL,
    supermarket_id INTEGER NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supermarket_id) REFERENCES Supermarkets (id),
    UNIQUE (code, supermarket_id)
);

CREATE TABLE ProductPrices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    code VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES Products (id)
);

CREATE TABLE AdditionalInformation (
    id SERIAL PRIMARY KEY,
    supermarket_id INTEGER NOT NULL,
    total_items INTEGER NOT NULL,
    total_value DECIMAL(10, 2) NOT NULL,
    value_paid DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    access_key VARCHAR(255),
    other_information TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supermarket_id) REFERENCES Supermarkets (id)
);

-- Explicação das Tabelas
-- Tabela Supermarkets: Contém informações sobre os supermercados, incluindo latitude (address_lat) e longitude (address_lng) para localização.
-- Tabela Products: Armazena os produtos disponíveis em cada supermercado, com uma chave estrangeira (supermarket_id) referenciando a tabela Supermarkets. 
-- A combinação de code e supermarket_id deve ser única para garantir que um produto com o mesmo código não seja duplicado no mesmo supermercado.
-- Tabela ProductPrices: Guarda os preços dos produtos ao longo do tempo, com uma chave estrangeira (product_id) referenciando a tabela Products.
-- Tabela AdditionalInformation: Armazena informações adicionais sobre compras em supermercados, referenciando a tabela Supermarkets.
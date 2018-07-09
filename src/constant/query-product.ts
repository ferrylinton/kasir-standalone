export const DROP_TABLE = `DROP TABLE IF EXISTS m_product`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS m_product (
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL, 
    price DECIMAL NOT NULL, 
    image BLOB, 
    category_id VARCHAR(40) NOT NULL REFERENCES m_category(id),
    created_by VARCHAR(30),
    created_date DATE,
    last_modified_by VARCHAR(30),
    last_modified_date DATE
)`;

export const INSERT = 
`INSERT INTO 
    m_product(id, name, description, price, image, category_id, created_by, created_date) 
    VALUES (?, ?, ?, ?, ?, ?, 'system', datetime('now','localtime'))`;


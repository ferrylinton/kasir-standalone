export const DROP_TABLE = `DROP TABLE IF EXISTS m_category`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS m_category (
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL, 
    image BLOB,
    created_by VARCHAR(30),
    created_date DATE,
    last_modified_by VARCHAR(30),
    last_modified_date DATE
)`;

export const DELETE = `DELETE FROM m_category WHERE id = ?`;

export const INSERT = 
`INSERT INTO 
    m_category(id, name, description, image, created_by, created_date) 
    VALUES (?, ?, ?, ?, 'system', datetime('now','localtime'))`;

export const UPDATE = 
`UPDATE m_category SET 
    name = ?, 
    description = ?, 
    image = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
WHERE id = ?`;

export const FIND_BY_NAME = 
``
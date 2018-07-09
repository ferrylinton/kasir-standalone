export const DROP_TABLE = `DROP TABLE IF EXISTS t_order`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS t_order(
    id VARCHAR(40) PRIMARY KEY, 
    transaction_number VARCHAR(40) NOT NULL UNIQUE, 
    paid BOOLEAN NOT NULL DEFAULT false,
    canceled BOOLEAN NOT NULL DEFAULT false,
    created_by VARCHAR(30),
    created_date DATE,
    last_modified_by VARCHAR(30),
    last_modified_date DATE
)`;

export const INSERT = `INSERT INTO 
    t_order(id, transaction_number, paid, canceled, created_by, created_date) 
    VALUES (?, ?, ?, ?, 'system', datetime('now','localtime'))`;


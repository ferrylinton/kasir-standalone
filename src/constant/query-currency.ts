export const DROP_TABLE = 
'DROP TABLE IF EXISTS m_currency';

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS m_currency (
id VARCHAR(40) PRIMARY KEY,
name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(250),
created_by VARCHAR(30),
created_date DATE,
last_modified_by VARCHAR(30),
last_modified_date DATE
  )`;

export const INSERT = 
`INSERT INTO 
m_currency(id, name, description, created_by, created_date) 
VALUES (?, ?, ?, 'system', datetime('now','localtime'))`;

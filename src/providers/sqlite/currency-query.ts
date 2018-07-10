export const DROP_TABLE = `DROP TABLE IF EXISTS m_currency`;

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
  VALUES (?, ?, ?, ?, datetime('now','localtime'))`;

export const DELETE = `DELETE FROM m_currency WHERE id = ?`;

export const UPDATE =
  `UPDATE m_currency SET 
    name = ?, 
    description = ?, 
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
WHERE id = ?`;

export const FIND_ALL =
  `SELECT 
  cur.id as currency_id,
  cur.name as currency_name,
  cur.description as currency_description,
  cur.created_by as currency_created_by,
  cur.created_date as currency_created_date,
  cur.last_modified_by as currency_last_modified_by,
  cur.last_modified_date as currency_last_modified_date
FROM m_currency cur `;

export const FIND_BY_NAME =
  `SELECT 
    cur.id as currency_id,
    cur.name as currency_name,
    cur.description as currency_description,
    cur.created_by as currency_created_by,
    cur.created_date as currency_created_date,
    cur.last_modified_by as currency_last_modified_by,
    cur.last_modified_date as currency_last_modified_date
FROM m_currency cur
WHERE lower(name) LIKE ? ORDER BY ? LIMIT ? OFFSET ? `

export const COUNT_BY_NAME = `SELECT count(1) as total FROM m_currency where lower(name) LIKE ?`;
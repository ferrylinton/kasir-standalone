export const DROP_TABLE = 
`DROP TABLE IF EXISTS m_authority`;

export const CREATE_TABLE =
`CREATE TABLE IF NOT EXISTS m_authority(
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(250)
)`;

export const INSERT = 
`INSERT INTO m_authority (id, name, description) values(?, ?, ?)`;

export const FIND_ALL = 
`SELECT 
    aut.id as authority_id,
    aut.name as authority_name,
    aut.description as authority_description
    FROM m_authority aut ORDER BY name`;


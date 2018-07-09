export const DROP_TABLE = `DROP TABLE IF EXISTS m_role`;

export const CREATE_TABLE =
`CREATE TABLE IF NOT EXISTS m_role (
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
    m_role (id, name, description, created_by, created_date) 
    values(?, ?, ?, 'system', datetime('now','localtime'))`;

export const FIND_ALL = 
`SELECT 
    rol.id as role_id,
    rol.name as role_name,
    rol.description as role_description,
    rol.created_by as role_created_by,
    rol.created_date as role_created_date,
    rol.last_modified_by as role_last_modified_by,
    rol.last_modified_date as role_last_modified_date,
    aut.id as authority_id,
    aut.name as authority_name,
    aut.description as authority_description
FROM m_role rol 
LEFT JOIN m_role_authority rla ON rla.role_id = rol.id
LEFT JOIN m_authority aut ON aut.id = rla.authority_id 
ORDER BY rol.name`
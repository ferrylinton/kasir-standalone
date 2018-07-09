export const DROP_TABLE = `DROP TABLE IF EXISTS m_user`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS m_user (
    id VARCHAR(40) PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE, 
    password VARCHAR(50) NOT NULL, 
    fullname VARCHAR(150) NOT NULL, 
    role_id VARCHAR(40) REFERENCES m_role(id),
    activated BOOLEAN NOT NULL DEFAULT true,
    image BLOB,
    created_by VARCHAR(30),
    created_date DATE,
    last_modified_by VARCHAR(30),
    last_modified_date DATE
)`;

export const INSERT = 
`INSERT INTO  
    m_user(id, username, password, fullname, role_id, activated, image, created_by, created_date)
    values(?, ?, ?, ?, ?, ?, ?, 'system', datetime('now','localtime'))`;

export const UPDATE =
`UPDATE m_user SET 
    username = ?,
    password = ?,
    fullname = ?, 
    role_id = ?, 
    activated = ?,
    image = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
WHERE id = ?`

export const DELETE = `DELETE FROM m_user WHERE id = ?`;

export const FIND_BY_USERNAME = 
`SELECT 
    usr.id as user_id,
    usr.username as user_username,
    usr.password as user_password,
    usr.fullname as user_fullname,
    usr.activated as user_activated,
    usr.image as user_image,
    usr.created_by as user_created_by,
    usr.created_date as user_created_date,
    usr.last_modified_by as user_last_modified_by,
    usr.last_modified_date as user_last_modified_date,

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
FROM m_user usr
LEFT JOIN m_role rol ON rol.id = usr.role_id
LEFT JOIN m_role_authority rla ON rla.role_id = rol.id
LEFT JOIN m_authority aut ON aut.id = rla.authority_id 
WHERE usr.username = ? `

export const COUNT_BY_FULLNAME = `SELECT count(1) as total FROM m_user where lower(fullname) LIKE ?`;

export const FIND_BY_FULLNAME = 
`SELECT 
    usr.id as user_id,
    usr.username as user_username,
    usr.password as user_password,
    usr.fullname as user_fullname,
    usr.activated as user_activated,
    usr.image as user_image,
    usr.created_by as user_created_by,
    usr.created_date as user_created_date,
    usr.last_modified_by as user_last_modified_by,
    usr.last_modified_date as user_last_modified_date,

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
FROM m_user usr
LEFT JOIN m_role rol ON rol.role_id = usr.role_id
LEFT JOIN m_role_authority rla ON rla.role_id = rol.id
LEFT JOIN m_authority aut ON aut.id = rla.authority_id 
WHERE lower(usr.fullname) LIKE ? ORDER BY ? LIMIT ? OFFSET ? `


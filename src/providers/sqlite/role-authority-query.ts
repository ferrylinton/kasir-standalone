export const DROP_TABLE = `DROP TABLE IF EXISTS m_role_authority`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS m_role_authority (
    role_id VARCHAR(40) NOT NULL REFERENCES m_role(id),
    authority_id VARCHAR(40) NOT NULL REFERENCES m_authority(id)
)`;

export const INSERT = `INSERT INTO m_role_authority (role_id, authority_id) values(?, ?)`;

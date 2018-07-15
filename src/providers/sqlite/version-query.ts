export const DROP_TABLE =
    `DROP TABLE IF EXISTS app_version`;

export const CREATE_TABLE =
    `CREATE TABLE IF NOT EXISTS app_version (
        id VARCHAR(10) PRIMARY KEY, 
        created_date DATE NOT NULL
    )`;

export const INSERT =
    `INSERT INTO app_version(id, created_date) values(?, datetime('now','localtime'))`;


export const FIND_LATEST =
    `SELECT MAX(id) as version FROM app_version`;


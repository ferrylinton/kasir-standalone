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

export const UPDATE = 
`UPDATE m_product SET 
    name = ?, 
    description = ?, 
    price = ?,
    image = ?,
    category_id = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
WHERE id = ?`;

export const DELETE = `DELETE FROM m_product WHERE id=?`;

export const FIND = 
`SELECT 
    pro.id as product_id,
    pro.name as product_name,
    pro.description as product_description,
    pro.price as product_price,
    pro.image as product_image,
    pro.created_by as product_created_by,
    pro.created_date as product_created_date,
    pro.last_modified_by as product_last_modified_by,
    pro.last_modified_date as product_last_modified_date,
    cat.id as category_id,
    cat.name as category_name,
    cat.description as category_description,
    cat.image as category_image,
    cat.created_by as category_created_by,
    cat.created_date as category_created_date,
    cat.last_modified_by as category_last_modified_by,
    cat.last_modified_date as category_last_modified_date
FROM m_product pro
LEFT JOIN m_category cat ON pro.category_id = cat.id
ORDER BY ? LIMIT ? OFFSET ?`;

export const FIND_BY_CATEGORY = 
`SELECT 
    pro.id as product_id,
    pro.name as product_name,
    pro.description as product_description,
    pro.price as product_price,
    pro.image as product_image,
    pro.created_by as product_created_by,
    pro.created_date as product_created_date,
    pro.last_modified_by as product_last_modified_by,
    pro.last_modified_date as product_last_modified_date,
    cat.id as category_id,
    cat.name as category_name,
    cat.description as category_description,
    cat.image as category_image,
    cat.created_by as category_created_by,
    cat.created_date as category_created_date,
    cat.last_modified_by as category_last_modified_by,
    cat.last_modified_date as category_last_modified_date
FROM m_product pro
LEFT JOIN m_category cat ON pro.category_id = cat.id
WHERE pro.category_id = ?
ORDER BY ? LIMIT ? OFFSET ?`;

export const FIND_BY_NAME = 
`SELECT 
    pro.id as product_id,
    pro.name as product_name,
    pro.description as product_description,
    pro.price as product_price,
    pro.image as product_image,
    pro.created_by as product_created_by,
    pro.created_date as product_created_date,
    pro.last_modified_by as product_last_modified_by,
    pro.last_modified_date as product_last_modified_date,
    cat.id as category_id,
    cat.name as category_name,
    cat.description as category_description,
    cat.image as category_image,
    cat.created_by as category_created_by,
    cat.created_date as category_created_date,
    cat.last_modified_by as category_last_modified_by,
    cat.last_modified_date as category_last_modified_date
FROM m_product pro
LEFT JOIN m_category cat ON pro.category_id = cat.id
WHERE lower(pro.name) LIKE ?
ORDER BY ? LIMIT ? OFFSET ?`;

export const COUNT = `SELECT count(1) as total FROM m_product`;

export const COUNT_BY_CATEGORY = `SELECT count(1) as total FROM m_product where category_id = ?`;

export const COUNT_BY_NAME = `SELECT count(1) as total FROM m_product where lower(name) LIKE ?`;

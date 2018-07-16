export const DROP_TABLE = `DROP TABLE IF EXISTS t_order`;

export const CREATE_TABLE =
    `CREATE TABLE IF NOT EXISTS t_order(
    id VARCHAR(40) PRIMARY KEY, 
    transaction_number VARCHAR(40) NOT NULL UNIQUE, 
    paid BOOLEAN NOT NULL DEFAULT false,
    canceled BOOLEAN NOT NULL DEFAULT false,
    note varchar(250),
    created_by VARCHAR(30),
    created_date DATE,
    last_modified_by VARCHAR(30),
    last_modified_date DATE
)`;

export const INSERT =
    `INSERT INTO 
    t_order(id, transaction_number, paid, canceled, note, created_by, created_date) 
    VALUES (?, ?, ?, ?, ?, ?, datetime('now','localtime'))`;

export const INSERT_1 =
    `INSERT INTO 
        t_order(id, transaction_number, paid, canceled, note, created_by, created_date) 
        VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-1 days','localtime'))`;

export const INSERT_2 =
    `INSERT INTO 
    t_order(id, transaction_number, paid, canceled, note, created_by, created_date) 
    VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-2 days' ,'localtime'))`;

export const UPDATE =
    `UPDATE t_order SET
    transaction_number = ?, 
    paid = ?,
    canceled = ?, 
    note = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime') 
    WHERE id = ?`;

export const DELETE =
    `DELETE FROM t_order WHERE id=?`;

export const FIND_BY_DATE = `
SELECT 
    ord.id as order_id,
    ord.transaction_number as order_transaction_number,
    ord.paid as order_paid,
    ord.canceled as order_canceled,
    ord.note as order_note,
    ord.created_by as order_created_by,
    ord.created_date as order_created_date,
    ord.last_modified_by as order_last_modified_by,
    ord.last_modified_date as order_last_modified_date,

    itm.id as item_id,
    itm.quantity as item_quantity, 
    itm.price as item_price,
    itm.note as item_note,

    prd.id as product_id,
    prd.name as product_name,
    prd.description as product_description,
    prd.price as product_price,
    prd.image as product_image,
    prd.created_by as product_created_by,
    prd.created_date as product_created_date,
    prd.last_modified_by as product_last_modified_by,
    prd.last_modified_date as product_last_modified_date,

    cat.id as category_id,
    cat.name as category_name,
    cat.description as category_description,
    cat.image as category_image,
    cat.created_by as category_created_by,
    cat.created_date as category_created_date,
    cat.last_modified_by as category_last_modified_by,
    cat.last_modified_date as category_last_modified_date
FROM t_order ord
LEFT JOIN t_order_item itm ON ord.id = itm.order_id
LEFT JOIN m_product prd ON itm.product_id = prd.id
LEFT JOIN m_category cat ON prd.category_id = cat.id
WHERE strftime('%Y-%m-%d', ord.created_date) = ?
ORDER BY ord.created_date DESC LIMIT 10 OFFSET ?`;

export const COUNT_BY_DATE = `SELECT count(1) as total FROM t_order WHERE strftime('%Y-%m-%d', created_date) = ?`;

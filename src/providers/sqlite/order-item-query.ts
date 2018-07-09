export const DROP_TABLE = `DROP TABLE IF EXISTS t_order_item`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS t_order_item (
    id VARCHAR(40) PRIMARY KEY, 
    order_id VARCHAR(40) NOT NULL REFERENCES t_order(id),
    product_id VARCHAR(40) NOT NULL REFERENCES m_product(id),
    quantity INTEGER NOT NULL, 
    price DECIMAL NOT NULL
)`;

export const DELETE = `DELETE FROM t_order_item WHERE order_id = ?`;

export const INSERT = 
`INSERT INTO 
    t_order_item(id, order_id, product_id, quantity, price) 
    VALUES (?, ?, ?, ?, ?)`;
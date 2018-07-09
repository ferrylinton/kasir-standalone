export const DROP_TABLE = `DROP TABLE IF EXISTS t_order_item`;

export const CREATE_TABLE = 
`CREATE TABLE IF NOT EXISTS t_order_item (
    id VARCHAR(40) PRIMARY KEY, 
    order_id VARCHAR(40) NOT NULL REFERENCES t_order(id),
    product_id VARCHAR(40) NOT NULL REFERENCES m_product(id),
    product_quantity INTEGER NOT NULL, 
    product_name VARCHAR(40) NOT NULL,
    product_price VARCHAR(40) NOT NULL
)`;

export const INSERT = 
`INSERT INTO 
    t_order_item(id, order_id, product_id, product_quantity, product_name, product_price) 
    VALUES (?, ?, ?, ?, ?, ?)`;
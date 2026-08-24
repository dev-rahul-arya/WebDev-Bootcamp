## JOINS

Joins are used to combine rows from two or more tables based on related columns between them. They allow you to retrieve data from multiple tables in a single query by specifying how the tables should be linked.

**Key Concepts:**
- Joins require a common column (usually a primary key from one table and a foreign key from another)
- The `ON` clause specifies the join condition
- Different join types return different subsets of data based on matching records

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(100),
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

## TYPES OF JOINS

<!-- Venn Diagrams -->

| Join Type | Left Table | Intersection | Right Table |
|-----------|-----------|--------------|-------------|
| **INNER JOIN** | ❌ | ✅ | ❌ |
| **LEFT JOIN** | ✅ | ✅ | ❌ |
| **RIGHT JOIN** | ❌ | ✅ | ✅ |
| **FULL OUTER JOIN** | ✅ | ✅ | ✅ |

```sql
SELECT c.customer_name, o.product_name, o.quantity
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id;
```

```sql
SELECT c.customer_name, o.product_name, o.quantity
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id;

SELECT c.customer_name, o.product_name, o.quantity
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id;

SELECT c.customer_name, o.product_name, o.quantity
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id;

SELECT c.customer_name, o.product_name, o.quantity
FROM customers c
RIGHT JOIN orders o
ON c.customer_id = o.customer_id;

SELECT c.customer_name, o.product_name, o.quantity
FROM customers c
FULL OUTER JOIN orders o
ON c.customer_id = o.customer_id;
```

## DDL - Data Definition Language

It's used to define and manage database objects like tables, indexes, veiws, etc. DDL commands deal with the structure and schema of the databse.

- __CREATE:__ Creates a new database object(e.g., table, index, view).
- __ALTER:__ Modifies an existing object(e.g., adds/removes columns, changes).
- __DROP:__ Deletes an object(e.g., table, index).
- __TRUNCATE:__ Removes all rows from a table but keeps the structure.
- __RENAME:__ Renames an existing object(e.g., table, column)

```sql
ALTER TABLE products ADD stock INT DEFAULT 0;

ALTER TABLE products
ALTER COLUMN price TYPE DECIMAL(12, 2);

ALTER TABLE products
DROP COLUMN category;
```

```sql
DROP TABLE products;
```

```sql
TRUNCATE TABLE products;
```

```sql
ALTER TABLE products
RENAME TO inventory;

ALTER TABLE products
RENAME COLUMN price TO product_price;
```

## DML - Data Manipulation Language

It is used to manipulate data stored in the database. DML commands deal with the data itself rather than the structure of the database.

- __INSERT:__ Inserts new data into a table.
- __UPDATE:__ Modifies existing data in a table.
- __DELETE:__ Removes rows from a table.
- __SELECT:__ Retrieves data form a table.

```sql
INSERT INTO products (name, price, stock)
VALUES ("Tshirt", 530.00, 32);
```

```sql
UPDATE products SET price = 600.00 WHERE name = "Tshirt";
```

```sql
DELETE FROM products WHERE name = "Tshirt";
```

```sql
SELECT * FROM products;

SELECT name, price FROM products WHERE price>400;
```

## DCL - DATA CONTROL LANGUAGE

It is used to control access to data in the database. DCL commands deal with permissions and access rights.

- __GRANT:__ Gives privileges to users or roles.
- __REVOKE:__ Takes away privileges from user.

```sql
-- ONLY SELECT COMMAND ACCESS PROVIDED TO JOHN
GRANT SELECT ON products TO john;
```

```sql
REVOKE SELECT ON products FROM john;
```

## TCL - TRANSACTION CONTROL LANGUAGE

TCL commands deal with transaction management in the databse. Transactions ensure that a series of DML statements are executed succesfully or not at all(atomicity).

- __BEGIN:__ Starts a transaction.
- __COMMIT:__ Saves changes made during the transaction.
- __ROLLBACK:__ Undoes changes made during trasaction.
- __SAVEPOINT:__ Sets a point to which a transaction can be rolled back.

```sql
--STARTING POINT
BEGIN;

INSERT INTO products (name, price, stock)
VALUES ("Jacket", 3000.00, 12);
UPDATE inventory SET stock = stock-5 WHERE name = "Jacket";

COMMIT;
-- CHECKPOINT ADDED
```

```sql
BEGIN;

SAVEPOINT savepoint1;

INSERT INTO products (name, price, stock) 
VALUES ("Jeans", 2300.00, 2);

-- IF ALL OK

-- IF SOME PROBLEM
ROLLBACK TO savepoint1;
```

## DTO - DATA TRANSFER OBJECTS

DTOs in SQL refer to objects or structures used to transfer data between different layers of an application, typically between the databse and the application layer. DTOs are designed to be simple containers for carrying data. Though DTO is a concept applied at the application layer, SQL results are often mapped into DTOs.

## DQL - DATA QUERY LANGUAGE

DQL is often considered a part of DML, specifically focusing on queries that retrieve data from the databse. SELECT is the only DQL command.

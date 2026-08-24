## CRUD OPERATIONS

A local chai shop owner wants to manage their inventory digitally. Let's help them set up and manage their chai store database using SQL CRUD operations.

---

### 1. CREATE

The shop owner needs a database to store their chai inventory.

<details>
<summary>Solution</summary>

```sql
CREATE DATABASE chai_store_db;
```

```sql
USE DATABASE chai_store_db;
```

```sql
CREATE TABLE chai_store (
    id          SERIAL PRIMARY KEY,
    chai_name   VARCHAR(100),
    price       DECIMAL(5, 2),
    chai_type   VARCHAR(50),
    available   BOOLEAN
);
```

> `SERIAL` is a special data type in PostgreSQL that automatically generates a unique identifier for each row. It is often used for primary keys.

</details>

---

### 2. INSERT

The shop owner wants to add their initial chai inventory with 3 varieties.

<details>
<summary>Solution</summary>

```sql
INSERT INTO chai_store (
    chai_name, price, chai_type, available
) VALUES (
    'Masala Chai', 50.00, 'Spiced', TRUE
), (
    'Green Chai', 25.00, 'Herbal', TRUE
), (
    'Black Chai', 20.00, 'Classic', FALSE
);
```

</details>

---

### 3. READ

- Display all chai names with their prices in a readable format.
- Find all chais with "Chai" in their name.
- Find all chais priced below 30 INR.
Display chais sorted by price from highest to lowest.

<details>
<summary>Solution</summary>

```sql
SELECT chai_name AS "Chai Name", price AS "Cost in INR" FROM chai_store;

SELECT chai_name FROM chai_store IF "Chai" IN chai_name;
-- OR
SELECT chai_name FROM chai_store WHERE chai_name LIKE '%Chai%';

SELECT chai_name, price FROM chai_store WHERE price < 30.00;

SELECT chai_name, price FROM chai_store ORDER BY price DESC;
```

> `AS` is used to give a column or table an alias. It can be used to make the output more readable or to avoid naming conflicts.

> `LIKE` is a SQL operator used in a `WHERE` clause to search for a specified pattern in a column. The `%` symbol is a wildcard that represents zero or more characters.

> The `%` symbol can be used at the beginning, end, or both sides of the pattern to match any characters before or after the specified string.

</details>

---

### 4. UPDATE

The shop owner wants to update the Black Chai price to 38.00 and mark it as available.

<details>
<summary>Solution</summary>

```sql
UPDATE chai_store SET price = 38.00, available = TRUE WHERE chai_name = 'Black Chai';
```

</details>

---

### 5. DELETE

- The shop owner wants to remove the Green Chai from their inventory.
- The shop owner wants to close and remove the table and database completely.

<details>
<summary>Solution</summary>

```sql
DELETE FROM chai_store WHERE chai_name = 'Green Chai';

DROP TABLE chai_store;

DROP DATABASE chai_store_db;
```

</details>
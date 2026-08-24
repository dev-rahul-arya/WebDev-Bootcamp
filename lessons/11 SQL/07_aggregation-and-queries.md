## INNER QUERIES

An inner query is a query written inside another query. It is often used to fetch data that will be used by the outer query.

```sql
SELECT customer_name FROM customers WHERE customer_id IN (
    SELECT customer_id FROM orders WHERE product_name = "Tshirt"
);
```

> Nowadays, ORMs handle these kinds of database operations much more cleanly instead of making an exponential number of queries.

> Like we have `mongoose` for `MongoDB`, similarly we have `Prisma` and `Drizzle` for `SQL`.

## AGGREGATOR FUNCTIONS

Aggregator functions help us summarize data from a table. They are used with `SELECT` to return a single value based on many rows.

Aggregator functions are powerful tools for analyzing data:

- `COUNT()` → number of rows
- `SUM()` → total of a numeric column
- `AVG()` → average value
- `MIN()` → lowest value
- `MAX()` → highest value

Use `GROUP BY` to group rows and `HAVING` to filter grouped results.

---

### 1. COUNT()
Returns the number of rows that match a condition.

```sql
SELECT COUNT(*) FROM customers;
```

```sql
SELECT COUNT(*) FROM orders WHERE status = "Paid";
```

### 2. SUM()
Adds up numeric values in a column.

```sql
SELECT SUM(total_price) FROM orders;
```

### 3. AVG()
Finds the average value of a numeric column.

```sql
SELECT AVG(total_price) FROM orders;
```

### 4. MIN()
Returns the smallest value in a column.

```sql
SELECT MIN(total_price) FROM orders;
```

### 5. MAX()
Returns the largest value in a column.

```sql
SELECT MAX(total_price) FROM orders;
```

## GROUP BY

`GROUP BY` groups rows that have the same values in specified columns and lets you apply aggregate functions on each group.

```sql
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id;
```

This returns how many orders each customer has placed.

## HAVING

`HAVING` is used to filter grouped results, similar to `WHERE`, but for aggregated data.

```sql
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 2;
```

This shows only customers with more than 2 orders.

## ORDER BY

`ORDER BY` sorts the result set in ascending or descending order.

```sql
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id
ORDER BY COUNT(*) DESC;
```

This sorts customers by the number of orders from highest to lowest.
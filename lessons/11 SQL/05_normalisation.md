## DATABASE NORMALISATION

Database normalization is the process of organizing the fields and tables of a relational database to minimize redundancy and dependency. It involves dividing large tables into smaller (and less redundant) tables and defining relationships between them. The objective is to isolate data so that additions, deletions, and modifications can be made in just one table and then propagated through the rest of the database via the defined relationships.

Read more at - [Wikipedia](https://en.wikipedia.org/wiki/Database_normalization)

---

### 1NF FORM

#### Key Requirements of 1NF

- __Atomicity:__ All the values in a column should be atomic(indivisible). Each column must contain a single value, not a set of values.
- __Unique Column Names:__ Each column should have a unique name.
- __Uniqueness of Records:__ Each record(row) must be unique. There should be a primary key or a way to uniquely identify each record.
- __No Repeating Groups:__ There should be no multiple values(or arrays) stored in a single column for a record.

---

### 2NF FORM

#### Key Requirements of 2NF

- It is in 1NF.
- It doesn't have any non-prime attribute that is functionally dependent on any proper subset of any candidate key of the relation(i.e., it lacks partial dependencies). A non-prime attribute of a relation is an attribute that is not a part of any candidate key of the relation.
- All non-key attributes must be fully functionally dependent on the entire primary key, not just part of it.

---

### 3NF FORM

#### Key Requirements of 3NF

- It is in 2NF.
- It doesn't have any transitive dependencies. A non-prime attribute should not be dependent on any other non-prime attribute. All non-key attributes must depend only on the primary key.
- Each non-key attribute must provide a fact about the primary key that is not covered by any other non-key attribute.

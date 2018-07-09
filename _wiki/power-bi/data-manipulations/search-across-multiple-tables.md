---
title: Search Across Multiple Tables
date: 2018-05-11
display-date: Y
categories: [ Power BI ]
tags: [ Data Manipulation ]
---

Imagine that you have the following two tables. Table 1 contains a source of data, and Table 2 is effectively a catalogue of data from multiple different sources (including Table 1). You want to use a single slicer visual to search for IDs across both tables.

_Table 1:_

| ID | Make | Model | In Table 2 |
|-------|-------|-------|-------|
| 1 | Toyota | Yaris | True |
| 3 | Mini | Cooper | True |
| 4 | Suzuki | Swift | False |
| 5 | Hyundai | i20 | True |

_Table 2:_

| ID | Author | Creation Date | In Table 1 |
|-------|-------|-------|-------|
| 1 | Paul | 10/05/2018 | True |
| 2 | Jack | 13/03/2017 | False |
| 3 | Sarah | 01/03/2017 | True |
| 5 | Jane | 04/04/2018 | True |

Each of these tables are stored in separate databases, hence there is no pre-existing relationship between them.

To facilitate two-way reconciliation between the tables, a new column has been added to each which indicates whether a row with the same ID is present in the other table. For example, we can see that a record with ID 4 does not exist in Table 2, and a record with ID 2 does not exist in Table 1. These columns were created using a formula discussed in the [Reconcile Two Tables](/wiki/power-bi/data-manipulations/reconcile-two-tables.html) wiki article.

## Master ID List

To create the desired slicer, it's necessary to build a new table with a master list of IDs, and then create a relationship between this table, Table 1 and Table 2.

1. Import each table from their separate sources

2. Go to Merge Queries -> Merge Queries as new

3. Remove all columns from this new table except the two ID columns

4. Select both, and choose merge - giving you a table with a single column which lists of all IDs present in Table 1 and Table 2

5. Create a relationship between the ID columns in the original tables and the new table

Say you then created a page in a report with two table visuals displaying the values of Table 1 and Table 2. If a slicer based on the ID column of the new table is added and an ID is selected, the results of both table visuals will be updated to show only the rows which correspond to that ID.

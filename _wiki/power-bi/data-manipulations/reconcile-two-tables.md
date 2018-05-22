---
title: Reconcile Two Tables
date: 2018-05-10
display-date: Y
categories: [ Power BI ]
tags: [ Data Manipulation ]
---

Imagine that you have the following two tables. Table 1 contains a source of data, and Table 2 is effectively a catalogue of data from multiple different sources. Each of these tables are stored in a seperate database, hence there is no pre-existing relationship between them.

_Table 1:_

| ID | Make | Model |
|-------|--------|---------|
| 1 | Toyota | Yaris |
| 2 | Honda | Jazz |
| 3 | Mini | fuji |
| 4 | Suzuki | Swift |
| 5 | Hyundai | i20 |

_Table 2:_

| ID | Author | Creation Date |
|-------|--------|---------|
| 1 | Paul | 10/05/2018 |
| 3 | Sarah | 01/03/2017 |
| 5 | Jane | 04/04/2018 |

The process of cataloging the data in Table 1 is underway, and you want to produce a view in Power BI which indicates whether each item in Table 1 has been catalogued in Table 2, as follows:

_Table 3:_

| ID | Make | Model | Catalogued |
|-------|--------|---------|
| 1 | Toyota | Yaris | True |
| 2 | Honda | Jazz | False |
| 3 | Mini | fuji | True |
| 4 | Suzuki | Swift | False |
| 5 | Hyundai | i20 | True |

[This](https://community.powerbi.com/t5/Desktop/If-column-contains-values-from-column-in-another-table/td-p/57271) topic on the Power BI community forum provided a couple of options for achieving this.

## Related Tables

In the case of the tables above, we can setup a 1:1 relationship between the ID columns in each table. The Catalogued column in Table 3 can then be created using the following DAX expression:

```bash
Catalogued = CONTAINS(Table2, Table2[ID], Table1[ID])
```

The following expression was also mentioned in the Power BI forum topic, but (as highlighted by other users) is a tad clunky in comparison:

```bash
Catalogued = NOT(ISBLANK(RELATED(Table2[ID])))
```

## Unrelated Tables

The following DAX experession will produce the desired column regardless of whether there is a relationship between the tables:

```bash
Catalogued = CALCULATE(COUNTROWS(Table2), FILTER(Table2, Table2[ID]=Table1[ID])) > 0
```

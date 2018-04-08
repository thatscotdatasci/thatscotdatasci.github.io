---
title: Fill Empty Values from another Column
date: 2018-03-25
display-date: Y
categories: [ Python ]
tags: [ Pandas, Neat Tricks ]
---

**Credit:** [Stack Overflow](https://stackoverflow.com/questions/35530640/pandas-use-value-if-not-null-else-use-value-from-next-column)

If you want to create a column which uses a value from one column when it is not blank, and a value from another when it is, the following trick can be used:

{% highlight python %}
df['Col3'] = df['Col1'] # Where Col1 is known to contain some blanks

df['Col3'].fillna(df['Col2'])
{% endhighlight %}

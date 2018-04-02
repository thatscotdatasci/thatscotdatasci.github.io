---
title: Zeroes not Nones
categories: [ Power BI ]
tags: [ Neat Tricks ]
---

If you have ever wanted to display a count of the number of rows in a table, or the number of values in a column, on a Card, Guage or other Power BI visualisation you'll have likely observed the fact that **(None)** rather than 0 is returned if no records are found.

## Simple Solutions

For a while, I had been using DAX expressions similar to the following to get aroound this:

{% highlight bash %}
Measure = IF (CALCULATE ( SUM( Table[Column] ) ) = BLANK(),0,CALCULATE ( SUM Table[Column] ) ))
{% endhighlight %}

That was, until I can across a solution provide by user Sean in [this](https://community.powerbi.com/t5/Desktop/show-items-with-no-data-as-0-instead-of-blanks/m-p/341863) Power BI community post:

{% highlight bash %}
Measure = CALCULATE ( SUM (Table[Column] )) + 0
{% endhighlight %}

A fantastically simple, and much neater, solution.

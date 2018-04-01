---
title: List Slices
categories: [ Python ]
tags: [ Neat Tricks ]
---

# List Slices

I regularly use the following strategy to perform SQL queries using a list:


However, if there are too many items in your search list for the SQL server to handle, you may emcounter the following error:

> _pyodbc.Error: ('07002', '\[07002\] \[Microsoft\]\[SQL Server Native Client 11.0\]COUNT field incorrect or syntax error (0) (SQLExecDirectW)')_
<br><br>

## Breaking it down

Rather than trying to force feed SQL with so many items to search

{% highlight python %}
df['SourceType'] = df.apply(lambda df_row: determine_source_type(str(df_row['URL'])), axis=1)
{% endhighlight %}

Where the **determine_source_type** function is defined as follows:

{% highlight python %}
def determine_source_type(url):
    url = url.upper()

    internal_url_indicators = ('company.com', 'company.internal.com')
    shared_drive_indicators = ('company_drive_1', 'company_drive_2')
    external_url_indicators = ('HTTP', 'WWW', '.COM')

    if any(indicator in url for indicator in internal_url_indicators):
        return 'INTERNAL_URL'
    if any(indicator in url for indicator in shared_drive_indicators):
        return 'SHARED_DRIVE'
    if any(indicator in url for indicator in external_url_indicators):
        return 'EXTERNAL_URL'
    return 'UNKNOWN'
{% endhighlight %}

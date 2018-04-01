---
title: Lambda Functions on Data Frames
categories: [ Python ]
tags: [ Pandas, Neat Tricks ]
---

# Lambda Functions on Data Frames

Quoting [Pandas documentation](https://pandas.pydata.org/pandas-docs/stable/basics.html) (Essential Basic Functionality) regarding Row or Column-wise Function Application:

> _Arbitrary functions can be applied along the axes of a DataFrame or Panel using the apply() method, which, like the descriptive statistics methods, take an optional axis argument_

Taking advantage of this functionality in combination with lamda functions provides a powerful means of implementing advanced row or column based operations.
<br><br>

## Example Implementation

**Scenario:** URL data has been extracted from a database, and I wish to indicate whether each URL points to an internal or external website, or if it points to an internal shared drive.

**Solution:** In the following statement I create a new column in my data frame called **SourceType**, determining the appropriate value for each row by applying the function **determine_source_type** to each **URL** value.

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

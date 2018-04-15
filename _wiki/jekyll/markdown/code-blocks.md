---
title: Creating Code Blocks with Backticks
date: 2018-04-15
display-date: Y
categories: [ Jekyll ]
tags: [ Markdown ]
---

[This](https://help.github.com/articles/creating-and-highlighting-code-blocks/) GitHub help page, and the Markdown [documentation](https://daringfireball.net/projects/markdown/syntax#precode), outlines one method of creating and highlighting code blocks:

>_You can create fenced code blocks by placing triple backticks **```** before and after the code block. We recommend placing a blank line before and after code blocks to make the raw formatting easier to read._

An example of this is as follows:

```markdown
    ```
    function test() {
      console.log("notice the blank line before this function?");
    }
    ```
```

## What language is that?

It is possible to indicate what language your code block is written in, which will result in appropriate syntax highlighting.

For example, in [this](https://thatscotdatasci.com/wiki/python/lambda-functions-on-data-frames) wiki article, I have the following code snippet:

```python
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
```

Which was generated using the following Mardown:

<pre>
```python
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
```
</pre>

The full list of languages supported for Markdown syntax highlighting can be found [here](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml).

## Inception via Markdown

Additional note (and decending down another layer in an Inception-esque manor), the code used to generate the above code snippet (are you still with me?) was as follows:

<pre>
&lt;pre&gt;
```python
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
```
&lt;/pre&gt;
</pre>

I used HTML in a Markdown page, which I typically try to avoid, but in this case it provided the neatest solution.

The `<pre>` tag denotes [preformated text](https://www.w3schools.com/tags/tag_pre.asp):

>_Text in a <pre> element is displayed in a fixed-width font (usually Courier), and it preserves both spaces and line breaks._

## Lets do the time warp again

The next level of the dream: to escape the `<pre>` tags in the above code snippet, I used the [HTML entity counterparts](https://stackoverflow.com/questions/21631160/nesting-pre-and-pre-tags) for the pointed brackets.

* < becomes `&lt`;
* \> becomes `&gt`;

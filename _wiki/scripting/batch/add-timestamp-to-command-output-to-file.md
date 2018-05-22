---
title: Add Timestamps to stdout and stderr Piped to Log Files
date: 2018-05-11
display-date: Y
categories: [ Scripting ]
tags: [ Batch ]
---

The scheduled execution of a task was performed on a Windows Server by calling a batch script from Task Scheduler. I wanted to use [Splunk](https://www.splunk.com/) to monitor the results of this task, and to send me an alarm whenever an error occured.

Piping stdout and stderr to a log file was perfectly simple:

```batch
for /f "tokens=1-2 delims=:" %%a in ("%TIME%") do (set mytime=%%a%%b)
for /f "tokens=1-3 delims=/" %%a in ("%DATE%") do (set mydate=%%a.%%b.%%c)
set log="%home%\logs\log-%mytime%-%mydate%.log"

@echo %DATE% %TIME% - INFO  - Running process x > %log%

{run process x} >> %log% 2>&1
if %ERRORLEVEL% NEQ 0 (
@echo %DATE% %TIME% - ERROR - An error occurred running process x >> %log%
@echo %DATE% %TIME% - ERROR - Exiting process >> %log%
exit /b 1
)

@echo %DATE% %TIME% - INFO  - Process x completed successfully >> %log%
```

However the outut from `{run process x} >> %log 2>&1%` would not be prepended by timestamps:

>Fri 05/11/2018 14:06:42.68 - INFO  - Running process x\\
>This\\
>is\\
>the\\
>output\\
>Fri 05/11/2018 14:06:42.81 - INFO  - Process x completed successfully

This made parsing the log file with Splunk more challenging.

## Loopy

[This](https://stackoverflow.com/questions/39715936/add-timestamp-to-log-lines-from-batch-output) Stack Overflow topic led me to the solution:

```batch
for /f "delims=" %%i in ('{run process x}}') do (
		@echo %DATE% %TIME% - INFO  - %%i >> %log% 2>&1
)
```

This gave me the perfectly formatted log files I desired, making parsing the files with Splunk significantly easier:

>Fri 05/11/2018 14:06:42.68 - INFO  - Running process x\\
>Fri 05/11/2018 14:06:42.78 - INFO  - This\\
>Fri 05/11/2018 14:06:42.78 - INFO  - is\\
>Fri 05/11/2018 14:06:42.78 - INFO  - the\\
>Fri 05/11/2018 14:06:42.78 - INFO  - output\\
>Fri 05/11/2018 14:06:42.81 - INFO  - Process x completed successfully

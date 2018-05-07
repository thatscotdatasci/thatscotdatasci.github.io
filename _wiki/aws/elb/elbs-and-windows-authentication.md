---
title: ELBs and Windows Authentication
date: 2018-04-24
display-date: Y
categories: [ AWS ]
tags: [ ELB ]
---

I recently came across an issue hosting a website on an EC2 instance with IIS using [Windows Authentication](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/security/authentication/windowsauthentication/).

If I connected to the website directly using the FQDN or IP address of the EC2 instance, Windows authentication would work fine. Using [Wireshark](https://www.wireshark.org/) to capture the network traffic, I could see that a `401` was being returned following the initial `GET` request from my client computer, which also informed my web browser that `Negotiate` (i.e. Kerberos/NTLM, more info [here](https://docs.microsoft.com/en-us/dotnet/framework/wcf/feature-details/understanding-http-authentication)) and `NTLM` authentication methods were accepted. The follow-up GET request then included a Kerberos ticket corresponding to my AD user account.

However, if I placed the instance in an [AWS Elastic Load Balancer (ELB)](https://aws.amazon.com/elasticloadbalancing/) and then attempted to reach the IIS hosted website via the ELB's DNS name I was being repeately asked to provide credentials.

# Get out of my head(ers)

[This](https://cloudninjablog.wordpress.com/2014/08/22/configuring-aws-elb-to-work-with-windows-authentication/) blog post provided the solution to my problem: updating my classic ELB listener configuration from forwarding port 80 to port 80 via TCP, rather than HTTP, protocol resolved the issue.

Reviewing the [AWS documentation][AWS documentation] provides the following information:

> _-**TCP/SSL Protocol:** When you use TCP (layer 4) for both front-end and back-end connections, your load balancer forwards the request to the back-end instances **without modifying the headers**._
>
> _-**HTTP/HTTPS Protocol:** When you use HTTP (layer 7) for both front-end and back-end connections, your load balancer **parses the headers in the request** and terminates the connection before sending the request to the back-end instances._

It would appear that the parsing performed by the load balancer causes the issue I'd experienced.

**Note:** Listeners using the TCP/SSL Protocol _"do not receive cookies for session stickiness or X-Forwarded headers,"_ and so this solution will not be suitable for all websites. More information about session stickiness can be found in the [AWS documentation][AWS documentation].

>_When you use HTTP/HTTPS, you can enable sticky sessions on your load balancer. A sticky session binds a user's session to a specific back-end instance. This ensures that all requests coming from the user during the session are sent to the same back-end instance._

# And another thing...

The Wireshark trace also revealed that the authentication protocol had defaulted to NTLM via the ELB, rather than Kerberos.

[This](https://blogs.msdn.microsoft.com/chiranth/2014/04/17/setting-up-kerberos-authentication-for-a-website-in-iis/) MSDN blog post does a good job of explaining the reason why, and details how to ensure Kerberos is used:

>_\[Enabling the Negotiate security provider in IIS\] should be sufficient when you want to browse your site with the machine name as http://machinename or http://FQDN of machine name and you need not create any SPN’s ... as you will have a HOST SPN registered to your machine account by default when you join a machine to a domain. HOST SPN is similar to HTTP SPN’s and should be sufficient when you want to access a site over Kerberos._
>
>_If you want to access the site with a custom hostname we need to create appropriate SPN for the hostname and we need to register it either to the machine account or to the domain account._
>
>_We usually don’t register the SPN to a machine account and choose domain accounts when we have a web farm scenario (same site hosted in multiple servers behind a load balancer) and the same ticket from AD should be accessible in all the machines in the farm._

[AWS documentation]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-listener-config.html

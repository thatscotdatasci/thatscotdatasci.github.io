---
title: aws-vault
date: 2020-12-03
display-date: Y
categories: [ AWS ]
tags: [ Tools ]
---

High level overview article of [aws-vault](https://github.com/99designs/aws-vault):

> AWS Vault is a tool to securely store and access AWS credentials in a development environment.
> 
> AWS Vault stores IAM credentials in your operating system's secure keystore and then generates temporary credentials 
> from those to expose to your shell and applications. It's designed to be complementary to the AWS CLI tools, and is 
> aware of your profiles and configuration in ~/.aws/config.

The supported vaulting backends include the macOS Keychain and Windows Credential Manager.

## Quick Start

From the project's GitHub page.

Note the syntax for executing a CLI command: `aws-vault exec <profile> -- aws <cli command>`.

```shell_script
# Store AWS credentials for the "jonsmith" profile
$ aws-vault add jonsmith
Enter Access Key Id: ABDCDEFDASDASF
Enter Secret Key: %%%

# Execute a command (using temporary credentials)
$ aws-vault exec jonsmith -- aws s3 ls
bucket_1
bucket_2

# open a browser window and login to the AWS Console
$ aws-vault login jonsmith

# List credentials
$ aws-vault list
Profile                  Credentials              Sessions
=======                  ===========              ========
jonsmith                 jonsmith                 -
```

Roles can be added to `~/.aws/config` and commands executed using the role profile.
See the [AWS docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) on using a role in the AWS CLI.

```shell_script
[profile tom]
mfa_serial = arn:aws:iam::111111111111:mfa/tom

[profile role1]
source_profile = tom
role_arn = arn:aws:iam::22222222222:role/role1
mfa_serial = arn:aws:iam::111111111111:mfa/tom

[profile role2]
source_profile = tom
role_arn = arn:aws:iam::33333333333:role/role2
mfa_serial = arn:aws:iam::111111111111:mfa/tom
```

## How it Works (very briefly)

Look at the documentation for the full details, but to summarise:

> aws-vault uses Amazon's STS service to generate temporary credentials via the GetSessionToken or AssumeRole API calls.
> These expire in a short period of time, so the risk of leaking credentials is reduced.

AWS Vault exposes the temporary credentials to the sub-process in one of two ways:

- Environment variables
- Local [EC2 Instance Metadata server](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)

  > AWS Vault can run a background server to imitate the metadata endpoint that you would have on an EC2 instance. 
  > When your application uses the AWS SDK to locate credentials, it will automatically connect to this server that will 
  > issue a new set of temporary credentials (using the same profile as the one the server was started with). This server 
  > will continue to generate temporary credentials any time the application requests it.
  >
  > This approach has the major security drawback that while this aws-vault server runs, any application wanting to connect 
  > to AWS will be able to do so, using the profile the server was started with. Thanks to aws-vault, the credentials are 
  > not exposed, but the ability to use them to connect to AWS is!

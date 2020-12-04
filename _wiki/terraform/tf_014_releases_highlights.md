---
title: Terraform 0.14 Release Highlights
date: 2020-12-04
display-date: Y
toc: Y
categories: [ Terraform ]
tags: [ Releases ]
---

Lets take a look at the latest features/changes introduced in the Terraform 0.14 release.

# Release Info

**Released: December 2020**

- [Blog Announcement](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-14-general-availability)
- [Change Log](https://github.com/hashicorp/terraform/blob/v0.14/CHANGELOG.md)
- [Upgrade Guide](https://www.terraform.io/upgrade-guides/0-14.html)

# Concise Diff

[Terraform Blog Post](https://www.hashicorp.com/blog/terraform-0-14-adds-a-new-concise-diff-format-to-terraform-plans)

> The diff renderer used by terraform plan, terraform apply, and terraform show <planfile> has been updated to hide 
> unchanged and irrelevant fields. If any attributes, collection elements, or blocks are hidden, a count will be kept 
> and displayed at the end of the parent scope. This ensures that the diff is clearly only displaying a subset of the 
> resource.

This is an experimental feature, but is on by default. The new diff will:

> - Always show all identifying fields, initially defined as id, name, and tags, even if unchanged
> - Only show changed, added, or removed primitive values: string, number, or bool
> - Only show added or removed elements in unordered collections and structural types: map, set, and object
> - Show added or removed elements with up to two contextual unchanged elements for sequence types: list and tuple
> - Only show added or removed nested blocks, or blocks with changed attributes

# Sensitive Input Variables

[Terraform Blog Post](https://www.hashicorp.com/blog/terraform-0-14-adds-the-ability-to-redact-sensitive-values-in-console-output)

> Defining an input variable value as “sensitive” will result in Terraform redacting that value from CLI output. 
> The same is true for module outputs. Module outputs with the sensitive=true attribute set will also see their values 
> redacted throughout a Terraform plan.

```hcl-terraform
variable "user_information" {
  type = object({
    name    = string
    address = string
  })
  sensitive = true
}

output "db_password" {
  value       = aws_db_instance.db.password
  description = "The password for logging in to the database."
  sensitive   = true
}
```

> Defining a module output as “sensitive” imparts the same behavior for those outputs as with variables defined as 
> “sensitive”; those output values will be redacted even if they are consumed elsewhere in the Terraform plan.

Terraform has also introduced experimental functionality to allow providers to mark variables as sensitive.
Experimentation is needed to understand the cascade effects of marking variables/module output as sensitive. 

# Provider Dependency Lockfile

[Terraform Blog Post](https://hashicorp.com/blog/terraform-0-14-introduces-a-dependency-lock-file-for-providers)

Terraform 0.13 made it possible to install providers from customer-controlled or third-party remote registries.
Remote and automated Terraform workflows need to be able to duplicate previous runs exactly.

> The dependency lock file launching with Terraform 0.14 is generated automatically when Terraform init is run. 
> The generated lockfile should be committed into version control systems so that Terraform can guarantee to select
> exactly the same provider versions on future runs.
>
> Upgrading to a new provider (or collection of providers) can be completed via `terraform init -upgrade`.

# Forward Compatibility of State Files

> Terraform will now support reading and writing all compatible state files, even from future versions of Terraform.
> This means that users of Terraform 0.14.0 will be able to share state files with future Terraform versions until a new
> state file format version is needed.

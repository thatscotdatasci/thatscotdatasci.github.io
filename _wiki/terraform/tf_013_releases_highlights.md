---
title: Terraform 0.13 Release Highlights
date: 2020-12-04
display-date: Y
toc: Y
categories: [ Terraform ]
tags: [ Releases ]
---

Lets take a look at the latest features/changes introduced in the Terraform 0.13 release.

# Release Info

**Released: August 2020**

- [Blog Announcement](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-13)
- [Change Log](https://github.com/hashicorp/terraform/blob/v0.13/CHANGELOG.md)
- [Upgrade Guide](https://www.terraform.io/upgrade-guides/0-13.html)

# Meta-Arguments

[Terraform Blog Post](https://www.hashicorp.com/blog/terraform-0-13-brings-powerful-meta-arguments-to-modular-workflows)

Introduction of meta-arguments for modular workflows. These simplify and streamline configurations at the resource-level,
and are now available for module-centric workflows.

- `count`
- `for_each`
- `depends_on`

Creating multiple resource instances from a single resource block:

```hcl-terraform
variable "vpc_id" {
    type = string
}

variable "subnets" {
  type = map(object({
    cidr_block        = string
    availability_zone = string
  }))
}

resource "aws_subnet" "example" {
  for_each = var.subnets

  cidr_block        = each.value.cidr_block
  availability_zone = each.value.availability_zone
  tags = {
    Name = each.key
  }
}
```

The same is now possible for creating multiple module instances:

```hcl-terraform
variable "project_id" {
  type = string
}

variable "regions" {
  type = map(object({
    region            = string
    network           = string
    subnetwork        = string
    ip_range_pods     = string
    ip_range_services = string
  }))
}

module "kubernetes_cluster" {
  source   = "terraform-google-modules/kubernetes-engine/google"
  for_each = var.regions

  project_id        = var.project_id
  name              = each.key
  region            = each.value.region
  network           = each.value.network
  subnetwork        = each.value.subnetwork
  ip_range_pods     = each.value.ip_range_pods
  ip_range_services = each.value.ip_range_services
}
```

It is also now possible to declare that all objects inside a module share a particular dependency in the calling module.
However, Terraform say that this should be used as a last resort - instead, it is recommended to use data flow to imply
dependencies when possible. That is, Terraform continues to track module dependencies primarily via the input variables
and output values of a module.

```hcl-terraform
resource "aws_iam_policy_attachment" "example" {
  name       = "example"
  roles      = [aws_iam_role.example.name]
  policy_arn = aws_iam_policy.example.arn
}

module "uses-role" {
  # Module variables and other configuration

  depends_on = [aws_iam_policy_attachment.example]
}
```

# Automatic Installation of Third-Party Providers

[Terraform Blog Post](https://www.hashicorp.com/blog/automatic-installation-of-third-party-providers-with-terraform-0-13)

> The required providers syntax includes Terraform’s provider source syntax now supports a source address including 
> hostname support for multiple registries and namespaced providers.
>
> The required provider syntax is the scaffolding that empowers users to include partner and community providers into 
> their configuration. It will allow Terraform to download those providers automatically. It also solves the issue of
> namespace collisions which can arise from forks and generic provider names (ex. DNS).

```hcl-terraform
terraform {
    required_providers {
        # HashiCorp's dns provider
        hdns = {
            source = "hashicorp/dns"
        }
        # A hypothetical alternative dns provider
        mydns = {
            source = "mycorp/dns"
        }
    }
}
```

Note that in the above, two providers with the same type (`dns`) are declared. They can be differentiated by their **local
name**: `hdns` and `mydns` in the above case. The local name can be used as the label when configuring the provider in a
provider block:

```hcl-terraform
provider "hdns" {
    # "hashicorp/dns" provider configuration
}

provider "mydns" {
    # "mycorp/dns" provider configuration
}
```

If the local name is not the same as the provider type, you must specify the provider for each resource.

A provider source string is made up of the following parts: `[hostname]/[namespace]/type`. If `hostname` is omitted,
Terraform will use the Terraform Registry hostname as the default hostname.

```hcl-terraform
# A fully-qualified source address string includes the host, namespace, and type
random = {
    source = "registry.terraform.io/hashicorp/random"
}

# If the host is omitted, terraform assumes that the host is
# "registry.terraform.io".
random = {
    source = "hashicorp/random"   
}

# This is the same as the example above; source is case-insensitive.
random = {
    source = "HashiCorp/random"
}

# If the source string only includes the type, terraform assumes that the host
# is "registry.terraform.io" and the namespace is "hashicorp".
random = {
    source =  "random"
}

# If there is no source, terraform assumes that the host is "registry.terraform.io",
# the namespace is "hashicorp", and the type is the map key (random).
random = {}

```

To tell providers on disk apart Terraform now uses the following directory structure:

`$PLUGIN_DIRECTORY/$SOURCEHOSTNAME/$SOURCENAMESPACE/$NAME/$VERSION/$OS_$ARCH/`

> Third-party provider plugins — locally installed providers, not on the registry — need to be assigned an (arbitrary) 
> source and placed in the appropriate subdirectory for Terraform to find and use them.

# Custom Variable Validation

[Terraform Blog Post](https://www.hashicorp.com/blog/custom-variable-validation-in-terraform-0-13)

Allows configurations to contain validation conditions for a given variable.

The example given enforces that `ami_id` start with `ami`:

```hcl-terraform
variable "ami_id" {
  type = string

  validation {
    condition = (
      length(var.ami_id) > 4 &&
      substr(var.ami_id, 0, 4) == "ami-"
    )
    error_message = "The ami_id value must start with \"ami-\"."
  }
}
```

The release blog contains a slightly modified version:

```hcl-terraform
variable "ami_id" {
  type = string

  validation {
    condition     = can(regex("^ami-", var.example))
    error_message = "Must be an AMI id, starting with \"ami-\"."
  }
}
```

> Each variable block can have zero or more validation blocks, allowing an author to potentially write a specific error 
> message associated with each distinct check.
>
> The condition expression is evaluated in a reduced evaluation context that supports all of Terraform's built-in 
> functions but allows referring only to the variable being validated — in this case, var.ami_id — which evaluates to
> the value given by the caller after any automatic conversion to the given type constraint string. The expression can 
> therefore safely assume var.ami_id is a string in this case.

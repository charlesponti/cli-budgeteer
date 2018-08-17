budgeteer-cli
=============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/budgeteer-cli.svg)](https://npmjs.org/package/budgeteer-cli)
[![CircleCI](https://circleci.com/gh/charlesponti/budgeteer-cli/tree/master.svg?style=shield)](https://circleci.com/gh/charlesponti/budgeteer-cli/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/charlesponti/budgeteer-cli?branch=master&svg=true)](https://ci.appveyor.com/project/charlesponti/budgeteer-cli/branch/master)
[![Codecov](https://codecov.io/gh/charlesponti/budgeteer-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/charlesponti/budgeteer-cli)
[![Downloads/week](https://img.shields.io/npm/dw/budgeteer-cli.svg)](https://npmjs.org/package/budgeteer-cli)
[![License](https://img.shields.io/npm/l/budgeteer-cli.svg)](https://github.com/charlesponti/budgeteer-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g budgeteer-cli
$ budgeteer-cli COMMAND
running command...
$ budgeteer-cli (-v|--version|version)
budgeteer-cli/0.0.0 darwin-x64 node-v9.9.0
$ budgeteer-cli --help [COMMAND]
USAGE
  $ budgeteer-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->
* [`budgeteer-cli hello [FILE]`](#budgeteer-cli-hello-file)
* [`budgeteer-cli help [COMMAND]`](#budgeteer-cli-help-command)

## `budgeteer-cli hello [FILE]`

describe the command here

```
USAGE
  $ budgeteer-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ budgeteer-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/charlesponti/budgeteer-cli/blob/v0.0.0/src/commands/hello.ts)_

## `budgeteer-cli help [COMMAND]`

display help for budgeteer-cli

```
USAGE
  $ budgeteer-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_
<!-- commandsstop -->

This is a tool which creates a GraphQL API and command-line interface for interacting with
one's financial history in the form of transactions.

## Transactions

Transactions are in the form of:

| Key | Description |
|------------------|--------------------------------------------------------|
| Date             | When the transaction occurred |
| Amount           | How much transaction cost |
| Account          | Account which transaction occurred on |
| Transfer Account | Account which money is coming from if transaction is a transfer |
| Payee            | Individual, business, account, etc. the payment is for |
| Description      | Additional information about the transaction |
| Tags             | hashtags which allow the user to do more in depth and custom querying |

## To Do

- [x] GraphQL API
- [ ] Responsive Images
- [ ] Responsive Images of maps
- [ ] Server-side Graph Rendering

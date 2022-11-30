---
html: ledger_current.html
parent: ledger-methods.html
blurb: Get the current working ledger version.
labels:
  - Blockchain
---
# ledger_current
[[Source]](https://github.com/ripple/rippled/blob/master/src/ripple/rpc/handlers/LedgerCurrent.cpp "Source")

The `ledger_current` method returns the unique identifiers of the current in-progress [ledger](ledgers.html). This command is mostly useful for testing, because the ledger returned is still in flux.

## Request Format

An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
   "id": 2,
   "command": "ledger_current"
}
```

*JSON-RPC*

```json
{
    "method": "ledger_current",
    "params": [
        {}
    ]
}
```

*Commandline*

```sh
#Syntax: ledger_current
rippled ledger_current
```

<!-- MULTICODE_BLOCK_END -->

[Try it! >](websocket-api-tool.html#ledger_current)

The request contains no parameters.


## Response Format
An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "ledger_current_index": 6643240
  }
}
```

*JSON-RPC*

```json
200 OK

{
    "result": {
        "ledger_current_index": 8696233,
        "status": "success"
    }
}
```

*Commandline*

```json
{
   "result" : {
      "ledger_current_index" : 56844050,
      "status" : "success"
   }
}
```

<!-- MULTICODE_BLOCK_END -->

The response follows the [standard format][], with a successful result containing the following field:

| `Field`                | Type                                | Description   |
|:-----------------------|:------------------------------------|:--------------|
| `ledger_current_index` | Unsigned Integer - [Ledger Index][] | The ledger index of this ledger version. |

A `ledger_hash` field is not provided, because the hash of the current ledger is constantly changing along with its contents.

## Possible Errors

* Any of the [universal error types][].


{% partial file="/_snippets/_rippled_versions.md" /%}
{% include '_snippets/rippled-api-links.md' %}
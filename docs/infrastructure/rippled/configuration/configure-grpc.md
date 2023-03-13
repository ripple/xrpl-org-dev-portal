---
html: configure-grpc.html
parent: configure-rippled.html
blurb: Enable and configure the gRPC API.
labels:
  - Core Server
---
# Configure gRPC

The `rippled` server has a limited [gRPC API](https://grpc.io/) which [P2P mode servers](../../rippled-server-modes.md) can provide. Reporting mode servers use this API to retrieve data about the latest validated ledgers and transactions. You can enable the gRPC API on your server with a new configuration stanza. [New in: rippled 1.5.0][]

**Caution:** gRPC support is intended specifically for providing data to reporting mode servers from P2P mode servers. Breaking changes to the gRPC API may occur without warning or it may be removed entirely in future versions of the server.

## Prerequisites

To enable gRPC, you must meet the following prerequisites:

- You must have [installed rippled](../installation/index.mdx).

- Your server must be able to bind to the port you choose. The recommended port for gRPC is `50051`.

## Steps

To enable gRPC on your server, complete the following steps:

1. In your `rippled`'s config file, add a `[port_grpc]` configuration stanza.

        [port_grpc]
        port = 50051
        ip = 0.0.0.0

    The configurable fields are as follows:

    - `port` field defines the port the server listens on for gRPC connections from client applications. The recommended port is `50051`.
    - `ip` defines which interfaces the server listens on. The value `0.0.0.0` listens on all available network interfaces. To limit connections to the local loopback network (same machine), use `127.0.0.1` instead.

    The [recommended installation](../installation/index.mdx) uses the config file `/etc/opt/ripple/rippled.cfg` by default. Other places you can put a config file include `$HOME/.config/ripple/rippled.cfg` (where `$HOME` is the home directory of the user running `rippled`), `$HOME/.local/ripple/rippled.cfg`, or the current working directory from where you start `rippled`.

2. Start (or restart) the `rippled` service.

        sudo systemctl restart rippled

## See Also

- **Understanding the XRPL:**
    - [XRP Ledger Overview](xrp-ledger-overview.html)
    - [`rippled` Server Modes](../../rippled-server-modes.md)
- **XRPL Infrastructure:**
    - [Reliable Transaction Submission](reliable-transaction-submission.html)
    - [Manage the rippled Server](../../index.mdx)
- **Tutorials:**
    - [Get Started Using HTTP / WebSocket APIs](get-started-using-http-websocket-apis.html)
- **API Reference:**
    - [HTTP / WebSocket APIs](../../../references/http-websocket-apis/index.mdx)

<!--{# common link defs #}-->
<!-- {% include '_snippets/rippled-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/rippled_versions.md' %} -->
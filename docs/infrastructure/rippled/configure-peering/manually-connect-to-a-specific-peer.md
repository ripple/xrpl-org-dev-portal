---
html: manually-connect-to-a-specific-peer.html
parent: configure-peering.html
blurb: Connect your rippled server to a specific peer.
labels:
  - Core Server
---
# Manually Connect to a Specific Peer

Use these steps to manually connect your server to a specific peer in the XRP Ledger network.

**Tip:** If you want to make sure your server automatically connects to this server on startup and remains connected later, you may want to configure a peer reservation for that peer.


## Prerequisites

- You must know the IP address of the peer you want to connect to.
- You must know what port the peer you want to connect to uses for the XRP Ledger peer protocol. The default config file uses port 51235.
- You must have a network connection from your server to the peer. For example, the peer server must forward the appropriate port through its firewall.
- The peer server must have available peer slots. If the peer is already at its maximum number of peers, you can ask the peer server's operator to add a peer reservation for your server.

## Steps

To connect, use the [connect method][]. For example:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
    "command": "connect",
    "ip": "169.54.2.151",
    "port": 51235
}
```

*JSON-RPC*

```
{
    "method": "connect",
    "params": [
        {
            "ip": "169.54.2.151",
            "port": 51235
        }
    ]
}
```


*Commandline*

```
rippled connect 169.54.2.151 51235
```

<!-- MULTICODE_BLOCK_END -->


## See Also

- **Understanding the XRPL:**
    - [Peer Protocol](../../peer-protocol.md)
    - [The `rippled` Server](../../../concepts/understanding-xrpl/server/rippled-server.md)
- **XRPL Infrastructure:**
    - [Capacity Planning](../installation/capacity-planning.md)
    - [Troubleshoot the `rippled` Server](../troubleshooting/index.mdx)
- **API Reference:**
    - [connect method][]
    - [peers method][]
    - [print method][]
    - [server_info method][]

<!--{# common link defs #}-->
<!-- {% include '_snippets/rippled-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/rippled_versions.md' %} -->

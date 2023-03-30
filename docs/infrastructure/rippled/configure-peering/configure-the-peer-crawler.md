---
html: configure-the-peer-crawler.html
parent: configure-peering.html
blurb: Configure how much information your rippled server reports publicly about its status and peers.
labels:
  - Core Server
  - Security
---
# Configure the Peer Crawler

By default, `rippled` servers provide statistics publicly to anyone who asks using the peer crawler API, to make it easier to track the health and topology of the XRP Ledger's peer-to-peer network. You can configure your server to provide more or less information, or to reject peer crawler requests entirely.

This document contains steps for two options:

- Change the Information Reported by the Peer Crawler
- Disable the Peer Crawler

## Change the Information Reported by the Peer Crawler

To configure how much information your server provides in response to peer crawler requests, complete the following steps:

1. Edit your `rippled`'s config file.

        vim /etc/opt/ripple/rippled.cfg

    {% include '_snippets/conf-file-location.md' %}<!--_ -->

2. Add or update the `[crawl]` stanza in your config file, and save the changes:

        [crawl]
        overlay = 1
        server = 1
        counts = 0
        unl = 1

    The fields in this stanza control which fields the server returns in the peer crawler response. The names of the config fields match the fields of the API response. A setting with a value of `1` means to include the field in the response. A value of `0` means to omit that field from the response. This example shows the default values for each setting.

3. After saving the changes to the config file, restart your `rippled` server to apply the updated configuration:

        systemctl restart rippled


## Disable the Peer Crawler

To disable the peer crawler API on your server, so it does not respond to peer crawler requests at all, complete the following steps:

1. Edit your `rippled`'s config file.

        vim /etc/opt/ripple/rippled.cfg

    {% include '_snippets/conf-file-location.md' %}<!--_ -->

2. Add or update the `[crawl]` stanza in your config file, and save the changes:

        [crawl]
        0

    Remove or comment out all other contents of the crawl stanza.

3. After saving the changes to the config file, restart your `rippled` server to apply the updated configuration:

        systemctl restart rippled


## See Also

- **Understanding the XRPL:**
    - [Peer Protocol](../../peer-protocol.md)
- **XRPL Infrastructure:**
    - [Manage the rippled Server](../../index.mdx)
- **API Reference:**
    - [server_info method][]
    - [peers method][]
    - [Peer Crawler](../../../references/http-websocket-apis/peer-port-methods/peer-crawler.md)

<!--{# common link defs #}-->
<!-- {% include '_snippets/rippled-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/rippled_versions.md' %} -->

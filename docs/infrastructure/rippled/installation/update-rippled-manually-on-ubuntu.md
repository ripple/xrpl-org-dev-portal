---
html: update-rippled-manually-on-ubuntu.html
parent: install-rippled.html
blurb: Manually update rippled on Ubuntu Linux.
labels:
  - Core Server
  - Security
---
# Update Manually on Ubuntu or Debian

This page describes how to update manually to the latest release of `rippled` on Ubuntu Linux. These instructions assume you have already [installed `rippled` using the native package](install-rippled-on-ubuntu.md). Ripple recommends setting up [automatic updates](update-rippled-automatically-on-linux.md) instead, where possible.
<!--
> **Caution:** Ripple renewed the GPG key used to sign binary packages shortly before the release of v1.7.0. If you are upgrading from a version earlier than 1.7.0, you must first download and manually trust the updated public key as follows:
>
>     wget -q -O - "https://repos.ripple.com/repos/api/gpg/key/public" | \
>       sudo apt-key add -
>
> For more information, see the [`rippled` 1.7.0 release notes](https://xrpl.org/blog/2021/rippled-1.7.0.html#upgrading-special-action-required).
-->
**Tip:** To perform these steps all at once, you can run the `/opt/ripple/bin/update-rippled.sh` script, which is included with the `rippled` package and is compatible with Ubuntu and Debian. This script should be run as a `sudo` user.

To update manually, complete the following steps:

1. Update repositories:

        $ sudo apt -y update

2. Upgrade the `rippled` package:

        $ sudo apt -y upgrade rippled

3. Reload the `systemd` unit files:

        $ sudo systemctl daemon-reload

4. Restart the `rippled` service:

        $ sudo service rippled restart


## See Also

- **Understanding the XRPL:**
    - [The `rippled` Server](../../../concepts/understanding-xrpl/server/xrpl-servers.md)
    - [Consensus](../../../concepts/understanding-xrpl/xrpl/consensus.md)
- **XRPL Infrastructure:**
<!--    - [`rippled` v1.3.x Migration Instructions](rippled-1-3-migration-instructions.html)  Note: remove when versions older than v1.3 are basically extinct -->
    - [Troubleshoot rippled](../troubleshooting/index.mdx)
- **API Reference:**
    - [HTTP / Websocket APIs](../../../references/http-websocket-apis/index.mdx)
        - [`rippled` Commandline Usage](../../../references/http-websocket-apis/commandline-usage.md)
        - [server_info method][]


<!--{# common link defs #}-->
<!-- {% include '_snippets/rippled-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/rippled_versions.md' %} -->

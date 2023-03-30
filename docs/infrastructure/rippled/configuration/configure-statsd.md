---
html: configure-statsd.html
parent: configure-rippled.html
blurb: Monitor your rippled server with StatsD metrics.
labels:
  - Core Server
---
# Configure StatsD

`rippled` can export health and behavioral information about itself in [StatsD](https://github.com/statsd/statsd) format. Those metrics can be consumed and visualized through [`rippledmon`](https://github.com/ripple/rippledmon) or any other collector that accepts StatsD formatted metrics.

## Configuration Steps

To enable StatsD on your `rippled` server, perform the following steps:

1. Set up a `rippledmon` instance on another machine to receive and aggregate stats.

        $ git clone https://github.com/ripple/rippledmon.git
        $ cd rippledmon
        $ docker-compose up

    Make sure [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) are installed on your machine when performing the steps above. For more information about configuring `rippledmon`, see the [`rippledmon` repository](https://github.com/ripple/rippledmon).

2. Add the `[insight]` stanza to your `rippled`'s config file.

        [insight]
        server=statsd
        address=192.0.2.0:8125
        prefix=my_rippled

    - For the `address`, use the IP address and port where `rippledmon` is listening. By default, this port is 8125.
    - For the `prefix`, choose a name that identifies the `rippled` server you are configuring. The prefix must not include whitespace, colons ":", or the vertical bar "|". The prefix appears on all of the StatsD metrics exported from this server.

    The [recommended installation](../installation/index.mdx) uses the config file `/etc/opt/ripple/rippled.cfg` by default. Other places you can put a config file include `$HOME/.config/ripple/rippled.cfg` (where `$HOME` is the home directory of the user running `rippled`), `$HOME/.local/ripple/rippled.cfg`, or the current working directory from where you start `rippled`.


3. Restart the `rippled` service.

        $ sudo systemctl restart rippled

4. Check that the metrics are being exported:

        $ tcpdump -i en0 | grep UDP

    Replace `en0` with the appropriate network interface for your machine. For a complete list of the interfaces on your machine use `$ tcpdump -D`.

    Sample Output:

        00:41:53.066333 IP 192.0.2.2.63409 > 192.0.2.0.8125: UDP, length 196

    You should periodically see messages indicating outbound traffic to the configured address and port of your `rippledmon` instance.

For descriptions of each StatsD metric, see the [`rippledmon` repository](https://github.com/ripple/rippledmon).



## See Also

- **Understanding the XRPL:**
    - [XRP Ledger Overview](xrp-ledger-overview.html)
    - [Consensus Network](consensus-network.html)
    - [The `rippled` Server](../../../concepts/understanding-xrpl/server/rippled-server.md)
- **XRPL Infrastructure:**
    - [Install `rippled`](../installation/index.mdx)
    - [Capacity Planning](../installation/capacity-planning.md)
- **API Reference:**
    - [server_info method](../../../references/http-websocket-apis/public-api-methods/server-info-methods/server_info.md)
    - [print method](../../../references/http-websocket-apis/admin-api-methods/status-and-debugging-methods/print.md)

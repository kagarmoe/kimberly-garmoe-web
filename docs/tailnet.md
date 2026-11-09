# My tailnet

How the machines on my home tailnet work together. One always-on hub runs
[swamp](https://github.com/swamp-club/swamp) and coordinates work. The other
machines are workers that dial out to it. Device names, the tailnet domain and
addresses are left out on purpose.

```mermaid
flowchart LR
  subgraph tailnet["Tailnet: no exit node, no Funnel, nothing public"]
    subgraph hub["tag:hub, always-on desktop"]
      serve["swamp serve<br/>wss, token auth, TLS"]
      hubworker["hub's own worker"]
      fleetdata[("fleet data<br/>tickets, inventory, run history")]
    end
    subgraph workers["tag:worker"]
      gpu["GPU worker, always on<br/>also tag:hub-standby<br/>local models on loopback only"]
      laptop["Laptop<br/>worker while awake"]
    end
    phone["Phone<br/>untagged client, runs nothing"]
  end
  lan["Home LAN printer<br/>subnet route"]

  gpu -- "dials out: worker connection,<br/>request-* workflows" --> serve
  laptop -- "dials out: worker connection,<br/>request-* workflows" --> serve
  hub -- "SSH, one way only:<br/>enroll and upkeep" --> workers
  hub -- "hourly backup<br/>restic over SFTP" --> gpu
  phone -- "dashboard, approvals" --> serve
  tailnet -. "all members" .-> lan
  laptop -. "break-glass SSH, Touch ID<br/>(planned)" .-> hub
  phone -. "break-glass SSH and RDP, Face ID<br/>(planned)" .-> hub
```

## How it fits together

- **Workers dial out.** Every machine that does work runs a swamp worker that
  connects to the hub's serve and runs the steps placed on it by label, such as
  `gpu: true` or `agent: claude`. Workers hold no credentials and no
  repository; secrets resolve on the hub. So a worker needs no open inbound
  port, and workers never talk to each other directly: one step writes data, the
  next reads it through the hub.
- **Machines ask, they don't act.** Each worker machine has its own swamp
  identity with a 7-day token rotated every 3 days. It may read workflows,
  behaviors and data, and start `request-*` intake workflows (file a ticket,
  ask for an agent run, ask for time-boxed access). Anything that isn't
  read-only waits for a person's approval, posted to Discord.
- **SSH goes one way.** The hub reaches the workers over SSH to enroll and
  update them. Nothing reaches the hub over SSH, because agents run on the
  workers and a path into the hub would be a path to its vault. A break-glass
  path for my own laptop and phone is planned, with each key needing Touch ID
  or Face ID.
- **Nothing is on the internet.** No Tailscale Funnel and no exit node. The
  serve is reached only inside the tailnet.
- **A warm standby.** The GPU worker keeps an hourly backup of the hub's data,
  and can be promoted if the hub is gone for a while.

## Access policy

The tailnet policy is code in a repository, changed only by pull request and
validated with the policy file's own tests, including negative ones. Roles are
Tailscale tags, so rules name a role, never a device. The tags and tests are
live; the narrowing below is the target the policy is moving to from
Tailscale's default allow-all.

| From | To | What |
| --- | --- | --- |
| a person at a keyboard | everything | all |
| `tag:worker` | `tag:hub` | the serve ports only |
| `tag:hub` | `tag:worker` | SSH, for enrollment and upkeep |
| untagged clients (phone) | `tag:hub` | the serve's dashboard |
| all members | the printer subnet route | as today |

Tests in the policy file check, among others, that a client can't reach a
worker and a worker can't SSH to the hub.

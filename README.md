The problem
===========

We need to relay customer data into Eloqua; total amount they pay us for, whether they pay us for various products so we can segment out marketing messages for various kinds of user.

In addition, doing periodic crawls of critical databases is not smart for system robustness, marketing systems should never be able to take down the registry, so we intend to use an air-gapped replica

On top of that, postgresql 9.3 doesn't support streaming replication in an air-gapped fashion easily or at all, and has severe limits in general for databases run in 'hot standby' mode, so any incremental piping data out of postgresql is a non-starter.

Intent
======

I intend to create a daemon that gives a pollable changes feed a la couchdb, complete with sequence numbers, out of chunky periodic restores of the postgresql database. This means we have no persistent database storage between snapshots of the database we examine, so this requires data storage outside of postgresql, making this a stateful service.

The `npm-marketing-follower` can additionally pull from this changes feed and relay to eloqua, giving us a single place that has to pay attention to Eloqua API wackiness and operational concerns.

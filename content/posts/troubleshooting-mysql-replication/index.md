---
draft: true
slug: troubleshooting-mysql-performance
title: Troubleshooting MySQL Performance
description: After two years of dealing with MySQL Performance and Replication issues, I've collected a set of typical problems, how to identify them and potential solutions
authors: David Simão
categories: [Software Engineering, Database]
tags: [Software Engineering, Database, MySQL, Replication, Troubleshooting, Percona Toolkit]
date: 2022-07-14T00:00:00+00:00
---

For the past couple of years, my team was responsible for a somewhat big MySQL deployment, both in terms of size and throughput, which gave us a lot of headaches and sleepless nights but also proved to that it could be tamed from a wild beast to a soft kitty. Below is a series of situations, and our approach to troubleshooting them, as well as potential solutions we found scattered across the MySQL community.

# Where to start

The better you know the system, the easier it gets to identify the issues, and maybe sometimes we already have so much context information that we skip certain steps of the troubleshooting. However, for the sake of simplicity, and to better emulate most situations we went through, let's just assume the basics: Something is slow and errors start popping out all over the place. We've already done our due diligence and are sure that the problem is in the db.

Troubleshooting also depends on what kind of deployment we're talking about. Most people today run their apps on managed databases, but our setup is a bit more classic: **3 virtual machines with MySQL, one of them is the master and the other two are replicas**. With monitoring in place ([mysqld_exporter](https://github.com/prometheus/mysqld_exporter) and [node_exporter](https://github.com/prometheus/node_exporter) + Grafana dashboards in our case), it's usually better to look at some hardware metrics before diving into mysql specifics:

- **CPU**: High CPU load is often the first indicator that things are going south, and it can show up as a symptom of many problems like bad configurations, slow queries, low memory, lack of space, or simply just a spike of requests so high that the cpu can't handle;

- **Memory**: Low free memory levels, or high memory utilisation levels might also mean that either the memory distribution is not properly setup, we're operating with very large sets of data that use a lot of memory for fast sorting and searching, or the hardware specs don't fit our needs;

- **IO**: High disk utilisation could mean that either MySQL is writing too often to disk, either because its swapping or because the frequency that it writes to the binlog is too high. It also might mean that our storage isn't fast enough;

- **Network**: Network metrics usually indicate external factors like abusive behavior (too many connections, too many queries) or bad infrastructure setups like too much latency between the mysql server and the application or its replicas;

# Proper Memory Configuration

# Proper IO Configuration
## innodb logs flush
## innodb memory pool

# It's only happening in one server
## Equal Hardware Specs
## Configuration Comparison
## Query plan Comparison

# Slow Queries
## Query Plan
## Max connections


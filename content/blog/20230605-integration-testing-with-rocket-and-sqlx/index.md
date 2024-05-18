---
slug: integration-testing-rocket-sqlx
title: Integration testing with rocket and sqlx
summary: A simple guide on how to build an integration testing setup for rocket microservices using the sqlx crate to leverage clean databases for each individual test
categories: [Engineering, Software Development]
tags: [Rust, Rocket, Sqlx, Integration Testing]
date: 2023-06-05T00:00:00+00:00
authors:
  - davidsimao
---

One of the many controversial aspects of software development is the way we test. Thanks to containers and the idea of one database per microservice, testing a running application that’s connected to a database is now an easy task, considered by many a best practice, one that allows greater confidence in the deployable.

{{< alert >}}
We define integration testing as the activity of testing an application and its database together, which might be controversial given that the database is also part of the application. However, in this article, we focus on the specifics of rocket and sqlx rather than the testing philosophy.
{{</ alert >}}

## Available tools

Once again, [rocket](https://rocket.rs/) and [sqlx](https://github.com/launchbadge/sqlx) have the right tools to do the job but we're missing a bit of support or compatibility between both as well as documentation on how to build an integration testing setup using these crates.

### SQLx test macro

We'll use the [`sqlx::test`](https://docs.rs/sqlx/latest/sqlx/attr.test.html) macro, which provides all the boilerplate required for integration testing:

- Creates a disposable database for each test case
- Provides utilities to connect to those databases
- Cleans up the used test databases
- Executes database migrations if needed

This looks almost perfect as it pretty much does everything we need outside testing, but the actual problem is wiring these test databases with the rocket testing framework.

### Rocket local client

Rocket tests use the [Local Client](https://api.rocket.rs/master/rocket/local/asynchronous/struct.Client.html), which takes an initialized rocket instance as a parameter. However, we usually configure a static database address in one of the configuration sources (by default `env` vars or `Rocket.toml` file) and we can't override `rocket_db_pools` with the connections created by `sqlx::test`.

## Creating a special instance for tests

Fortunately, one of the test modes supported by `sqlx::test` take the connection details as a parameter, instead of the connection pool itself. We can use that testing mode to get the generated database name and create a dynamic configuration that will be passed to the rocket initialization.

### Declaring test cases

As mentioned above, we'll be using the testing mode where the database connection details are passed to the test instead of the connection itself. We'll then pass those details to a function that will produce a local client and a rocket instance that is connected to the database provided by `sqlx::test`. This functionality must live on a separate function so that we can reuse it to create a new rocket instance on each test case.

There is one caveat in this approach though: For `sqlx::test` to orchestrate the testing databases, a `DATABASE_URL` variable needs to be declared in a `.env` file for postgres and mysql as mentioned in the [docs](https://docs.rs/sqlx/latest/sqlx/attr.test.html#supported-databases) so that it knows how to connect. We'll be using postgres in this article, which may have a slightly different implementation from mysql and sqlite.

```rust
#[sqlx::test]
async fn my_test_case(
  _pg_pool_options: PgPoolOptions,
  pg_connect_options: PgConnectOptions,
) -> sqlx::Result<()> {
  let client = async_client_from_pg_connect_options(pg_connect_options).await;
  ...
```

### Building a new rocket config

The next step is to create a new connection string and build a configuration object that can be used by rocket to connect to the database created by `sqlx::test`. `PgConnectOptions` only allows us to get the database name (using the `get_database()` method), so we'll have to hardcode the rest of the connection string or read it from the `.env` file. This only applies to the testing setup, so it should be an acceptable tradeoff.

With the new connection string (`db_url`) we can use the [`rocket::config`](https://api.rocket.rs/master/rocket/config/index.html) API to create a config map that is understood by rocket (`db_config`). We then merge it with `rocket::Config::figment()`, which is the default configuration that is read from the `env` and `Rocket.toml`.

{{< alert icon = "lightbulb" >}}
Rocket config uses the [Figment](https://github.com/SergioBenitez/Figment) crate, which is a library for loading configurations from multiple sources and merging them according to a given hierarchy of precedence.
{{</ alert >}}

```rust
pub async fn async_client_from_pg_connect_options(
  pg_connect_options: PgConnectOptions,
) -> Client {
  let db_url = format!(
    "postgres://postgres:example@localhost:5432/{}",
    pg_connect_options.get_database().unwrap()
  );

  let db_config: Map<_, Value> = map! {
    "url" => db_url.into(),
  };

  let figment = rocket::Config::figment()
    .merge(("databases", map!["mydb" => db_config]));

  let client = Client::tracked(rocket_from_config(figment))
    .await
    .expect("valid rocket instance");

  return client;
}
```

Once the configuration object is built, the only thing left to be done is to create a new rocket instance using this new config, which is what the `rocket_from_config` method will do.

### Creating a rocket instance with custom config

The hardest part is done, we now just need to change the way we create the rocket instance from using `rocket::build` to using `rocket::custom`. This can be done in many different ways, but to make sure that the app under test is as close as possible to the production one, the best we can do is to have a single function `rocket_from_config` handle the initialization code, and then the default `rocket` launcher passing `Config::figment()`, which is the default figment used by `rocket::build()`.

```rust
#[launch]
fn rocket() -> Rocket<Build> {
  rocket_from_config(Config::figment())
}

fn rocket_from_config(figment: Figment) -> Rocket<Build> {
  rocket::custom(figment)
    .attach(MyDb::init())
    .attach(AdHoc::try_on_ignite("SQLx Migrations", run_migrations))
    .mount(
      "/",
      routes![
        ...
      ],
    )
}
```

Voila! Our integration testing setup is complete and ready to use. Once the tests are run, sqlx will start creating `sqlx_test_xx` numbered databases, and each test deletes the previous one, so a quick way to validate that it worked, is just to check for a database with a name like that on the local db instance. Happy Testing!

## References in this article

- [Rocket Web Framework](https://rocket.rs/)
- [SQLx Database Toolkit](https://github.com/launchbadge/sqlx)
- [SQLx Test Macro](https://docs.rs/sqlx/latest/sqlx/attr.test.html)
- [Rocket Local Client](https://api.rocket.rs/master/rocket/local/asynchronous/struct.Client.html)
- [Figment Config Library](https://github.com/SergioBenitez/Figment)
- [Rocket Config](https://api.rocket.rs/master/rocket/config/index.html)

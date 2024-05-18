---
slug: db-migrations-rocket-sqlx
title: Database migrations with rocket and sqlx
summary: A simple guide on how to setup sql database migrations in rust using the rocket web framework and the sqlx toolkit crates
categories: [Engineering, Software Development]
tags: [Rust, Rocket, Sqlx, Database Migrations]
date: 2023-06-04T00:00:00+00:00
authors:
  - davidsimao
---

One of the most common setup tasks for starting a new microservice project is to automate the database setup so that it gets out of the way whenever there's a new schema update or the need to move data around.

The [rocket](https://rocket.rs/) and [sqlx](https://github.com/launchbadge/sqlx) libraries are a popular combination for building microservices in [rust](https://www.rust-lang.org/) and both of them offer great tooling to create an automated database migration setup.

## Setting up Rocket

Out of the box, rocket only provides you with a [database init fairing](https://api.rocket.rs/master/rocket_db_pools/trait.Database.html#method.init) for initializing the [`rocket_db_pools`](https://api.rocket.rs/master/rocket_db_pools/) connection pool, as documented in the [official guide](https://rocket.rs/v0.5-rc/guide/state/#databases). The `rocket_db_pools` crate supports the most popular databases but doesn't include anything about migrations.

{{< alert icon = "lightbulb" >}}
A [Fairing](https://api.rocket.rs/v0.5-rc/rocket/fairing/index.html) is a middleware that you can hook to certain stages of the rocket application and request lifecycle and execute custom callbacks
{{</ alert >}}

### Creating a Fairing for the migratons

Without built-in fairings for sqlx database migrations, we need to implement our own, either by creating a `struct` that implements the `Fairing` trait or by using the [`AdHoc`](https://api.rocket.rs/v0.5-rc/rocket/fairing/struct.AdHoc.html) fairing, which takes a callback for input.

```rust
#[derive(Database)]
#[database("mydb")]
pub struct MyDb(sqlx::PgPool);

async fn run_migrations(rocket: Rocket<Build>) -> fairing::Result {
  // run the migrations
}
```

We chose to use the `AdHoc` fairing for the sake of simplicity, but the `struct` approach would probably be easier to reuse or bundle in a library. The first step is to implement a function that takes a `Rocket<Build>` instance as a parameter and returns a `fairing::Result`. We'll focus on the implementation later but, for now, we only care about the function signature, which is the minimum required to create the fairing.

### Running the Fairing in the ignite phase

With the function in place, we can now pass it to the `AdHoc::try_on_ignite` method, which will create a fairing that will execute the `run_migrations` callback on the [ignite](https://api.rocket.rs/v0.5-rc/rocket/struct.Rocket.html) phase and prevent the application from starting if the callback fails with an error.

```rust
#[launch]
fn rocket() -> Rocket<Build> {
  let migrations_fairing = AdHoc::try_on_ignite("SQLx Migrations", run_migrations);
  rocket::build()
    .attach(MyDb::init())
    .attach(migrations_fairing)
    .mount(
      "/",
      routes![
        ...
      ],
    )
}
```

The last step is to attach the fairing to the application using the rocket builder and validate if it works properly by starting the app. The console output will reveal the attached fairings and the phases they are configured to run at.

```bash
📡 Fairings:
   >> 'mydb' Database Pool (ignite, shutdown)
   >> SQLx Migrations (ignite)
   >> Shield (liftoff, response, singleton)
```

## SQLx setup

Now we just need to run the migrations on our `run_migrations` callback, and for that, we use the [`sqlx::migrate!`](https://docs.rs/sqlx/latest/sqlx/macro.migrate.html) macro which takes a directory with `.sql` files and executes them against `MyDb` at runtime.

{{< alert icon = "lightbulb" >}}
The `migrate!` macro doesn't require the `.sql` files to be present at runtime, because it will load them to strings and embed them in the application binary during compile time.
{{</ alert >}}

```rust
async fn run_migrations(rocket: Rocket<Build>) -> fairing::Result {
  match MyDb::fetch(&rocket) {
    Some(db) => match sqlx::migrate!("./src/db/migrations").run(&**db).await {
      Ok(_) => Ok(rocket),
      Err(e) => {
        error!("Failed to run database migrations: {}", e);
        Err(rocket)
      }
    },
    None => Err(rocket),
  }
}
```

And that's it! If all went well, the application should start successfully and a new table `sqlx_migrations` was added to the db to keep track of what was already executed. Happy migrations !

## References included in this article

- [Rust programming language](https://www.rust-lang.org/)
- [Rocket web framework](https://rocket.rs/)
- [SQLx database toolkit](https://github.com/launchbadge/sqlx)
- [Rocket database guide](https://rocket.rs/v0.5-rc/guide/state/#databases)
- [Rocket database connection pool](https://api.rocket.rs/master/rocket_db_pools/)
- [Database init fairing](https://api.rocket.rs/master/rocket_db_pools/trait.Database.html#method.init)
- [Rocket fairing](https://api.rocket.rs/v0.5-rc/rocket/fairing/index.html)
- [Rocket AdHoc fairing](https://api.rocket.rs/v0.5-rc/rocket/fairing/struct.AdHoc.html)
- [Rocket Phases](https://api.rocket.rs/v0.5-rc/rocket/struct.Rocket.html)
- [SQLx migrate! macro](https://docs.rs/sqlx/latest/sqlx/macro.migrate.html)

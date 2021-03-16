import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const text = "I currently work as a lead software engineer at Truphone. I started working as a software developer after I graduated from Instituto Superior Tecnico in 2010 and have been doing that since. I'm passionate about building cool products and working with other individuals. I'm always interested in knowing about possible new oportunities and projects. I play video games, I run and I do lots of other random stuff."

const subtitle = "Professional software engineer."

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Someone from the internet">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--12', styles.feature)}>
                <p>{text}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

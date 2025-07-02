// pages/about.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us | Fullstack Blog</title>
        <meta name="description" content="Learn about the creators of this blog" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>About Us</h1>
        
        <div className={styles.aboutContent}>
          <section>
            <h2>Our Story</h2>
            <p>
              This blog was created by a team of passionate developers who wanted to share their knowledge
              and experiences with the community.
            </p>
          </section>
          
          <section>
            <h2>The Team</h2>
            <div className={styles.teamGrid}>
              {/* Team member cards */}
              <div className={styles.teamMember}>
                <h3>Member 1</h3>
                <p>Role: Fullstack Developer</p>
                <p>Bio: Description of this team member...</p>
              </div>
              
              <div className={styles.teamMember}>
                <h3>Member 2</h3>
                <p>Role: UI/UX Designer</p>
                <p>Bio: Description of this team member...</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
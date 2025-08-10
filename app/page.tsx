import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Orbas
          </Link>
          <div className={styles.navLinks}>
            <Link href="/signup">Sign Up</Link>
            <Link href="/api/auth/signin">Log In</Link>
          </div>
        </nav>
      </header>
      <section className={styles.hero}>
        <Image
          src="/api/image"
          alt="Collaborate"
          fill
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1>Welcome to Orbas</h1>
          <p>Connect, collaborate and grow with a global community.</p>
          <Link href="/signup" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.feature}>
          <h3>Connect</h3>
          <p>Build your network with like-minded professionals.</p>
        </div>
        <div className={styles.feature}>
          <h3>Create</h3>
          <p>Showcase your projects and skills with ease.</p>
        </div>
        <div className={styles.feature}>
          <h3>Grow</h3>
          <p>Discover new opportunities tailored for you.</p>
        </div>
      </section>
    </main>
  );
}

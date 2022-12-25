/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useJsApiLoader } from '@react-google-maps/api';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import navStyles from '../styles/Navbar.module.css';

const libraries = ['places'];

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>HireMe | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/HireMeHeadNew-light.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <span className={styles.companyName}>HireMe</span>
        </h1>
        <h2 className={styles.description}>
          Skilled professionals at your fingertips
        </h2>
        <Image priority="true" src="/aaa.jpg" alt="landing" height={200} width={200} />
      </main>

      <nav className={navStyles.bottomNav}>
        <div className={navStyles.bottomNavLinks}>
          <Navbar.Link
            href="/">
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">
            About
          </Navbar.Link>
          <Navbar.Link href="/contact">
            Contact
          </Navbar.Link>
        </div>
        <div className={navStyles.bottomNavProfile}>
          {session ? (
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" img={session.user.image} rounded />}>
                <Dropdown.Header>
                  <span className="block text-sm">
                    {session.user.name}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {session.user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link href="/account">My Account</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => signOut()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : <Link href="/login" onClick={() => signIn()}>Login</Link>}
        </div>
      </nav>
      <div className={navStyles.bottomFooter}>
        <Footer />
      </div>

    </div>
  );
}

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  signIn, useSession, signOut,
} from 'next-auth/react';
import {
  Button, Card, Navbar, Dropdown, Avatar, Rating,
} from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Details.module.css';
import navStyles from '../../styles/Navbar.module.css';
import Footer from '../../components/Footer';

const Details = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [professionals, setProfessionals] = React.useState(null);

  React.useEffect(() => {
    const { id } = router.query;
    if (!id) return;
    fetch(`https://safe-hire-me.azurewebsites.net/api/professionals/${id}`)
      .then(res => res.json())
      .then(data => setProfessionals(data))
      .catch(error => console.log(error));
  }, [router]);

  const handleSubmit = e => {
    e.preventDefault();
    if (session) {
      const serviceHistory = {
        userName: session.user.name,
        userEmail: session.user.email,
        userImage: session.user.image,
        professionalId: professionals.id,
        professionalName: professionals.professionalName,
        professionalService: professionals.professionalService,
        totalServicePrice: professionals.professionalPrice,
        professionalImage: professionals.professionalImage,
      };

      fetch(`https://safe-hire-me.azurewebsites.net/api/users/${session.user.email}`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(serviceHistory),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      router.push('/loading');
    } else {
      signIn();
    }
  };
  if (!professionals) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Loading</title>
        </Head>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          HireMe |
          {' '}
          {professionals.professionalName}
        </title>
        <meta name="keywords" content="professional" />
        <link rel="icon" href="/HireMeHeadNew-light.png" />
      </Head>
      <main className={styles.specificPro}>
        <Card className={styles.latestCustomers}>
          <div className="flex flex-col items-center pb-10">
            <Image src={professionals.professionalImage} width={200} height={200} className="mb-3 rounded-full shadow-lg" alt="test" />
            <h5 className="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">
              {professionals.professionalName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {professionals.professionalService}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {`${professionals.professionalAddress.split(' ')[professionals.professionalAddress.split(' ').length - 1]}`}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {professionals.professionalPrice}
              {' '}
              kr / hour
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex">
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {professionals.professionalRating}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              </Rating>
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Button onClick={handleSubmit}>
                Hire
              </Button>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Services
            </h5>
          </div>
          {professionals.professionalHistory.map(history => (
            <div key={history.historyId} className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={history.userImage}
                        alt="Neil image" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Client name:
                        {' '}
                        {history.userName}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Booked as:
                        {' '}
                        {history.userService}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </Card>
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
    </>
  );
};

export default Details;

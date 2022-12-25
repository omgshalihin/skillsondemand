import React from 'react';
import { Footer } from 'flowbite-react';
import Image from 'next/image';

const PageFooter = () => (

  <Footer container className="footer-container">
    <Footer.Copyright
      href="#"
      by="Copyright 2022 SAFE. All Rights Reserved."
      year={2022} />
    <Footer.LinkGroup>
      <Footer.Link href="https://github.com/FilipeRA/jfs_22_safe_final_project">
        <Image src="/GitHub-Mark-120px-plus.png" alt="" width={30} height={30} />
      </Footer.Link>
      <Footer.Link href="https://www.salt.dev/sv-SE" className="footer-school-name">
        Salt JFS Fall 2022
      </Footer.Link>
    </Footer.LinkGroup>
  </Footer>

);

export default PageFooter;

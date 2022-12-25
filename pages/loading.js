import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'flowbite-react';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // router.go(1); // can go back and forth through the history
      router.push('/summary');
    }, 1000);
  }, [router]);

  return (
    <div className="loading">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h1>Loading</h1>
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

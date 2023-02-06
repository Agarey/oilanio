import { useEffect } from 'react';

const Main = (props) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://oilan-courses.kz/';
    }
  }, []);

  return <div>Redirecting...</div>;
};

Main.getInitialProps = async ({ res }) => {
    res.writeHead(302, { Location: 'https://oilan-courses.kz/' });
    res.end();
    return {};
};

export default Main;
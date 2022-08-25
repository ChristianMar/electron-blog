import React from 'react';

interface footer {
  copyright: string;
}

const Footer = ({ copyright }: footer) => {
  return <p id="copyright">{copyright}</p>;
};

export default Footer;

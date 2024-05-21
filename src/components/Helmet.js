import { Helmet } from 'react-helmet';

const MyHelmet = ({ title, description, canonicalUrl }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default MyHelmet;
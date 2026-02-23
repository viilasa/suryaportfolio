import { createClient } from 'contentful';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string | undefined;

if (!space || !accessToken) {
  console.error(
    'Contentful credentials missing. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.'
  );
}

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});

export default client;

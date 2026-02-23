import { createClient } from 'contentful';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string | undefined;
const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN as string | undefined;

if (!space || !accessToken) {
  console.error(
    'Contentful credentials missing. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.'
  );
}

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});

// Preview client connects to preview.contentful.com and shows drafts
export const previewClient = (space && previewToken)
  ? createClient({
      space,
      accessToken: previewToken,
      host: 'preview.contentful.com',
    })
  : null;

export default client;

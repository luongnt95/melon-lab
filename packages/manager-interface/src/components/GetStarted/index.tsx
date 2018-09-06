import React from 'react';
import { withProps } from 'recompose';
import Link from 'next/link';
import GetStarted from '~/components/GetStarted';

const withLink = withProps({
  Link: (props) => <Link href="/setup"><a>Setup your fund</a></Link>
});

export default withLink(GetStarted);

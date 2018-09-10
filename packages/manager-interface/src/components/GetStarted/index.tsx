import React from 'react';
import { withProps } from 'recompose';
import Link from 'next/link';
import GetStarted from '~/components/GetStarted';
import StyledLink from '~/blocks/Link';

const withLink = withProps({
  Link: props => (
    <Link href="/setup" passHref>
      <StyledLink style="primary" size="medium">
        Setup your fund
      </StyledLink>
    </Link>
  ),
});

export default withLink(GetStarted);

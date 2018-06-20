import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { tracks } from '@melonproject/melon.js';

const showFaucet = process.env.TRACK === tracks.KOVAN_DEMO;

const InsufficientFunds = ({
  ethBalance,
  wethBalance,
  walletAddress,
  network,
}) => (
  <div>
    <Card centered>
      <Card.Content>
        <Card.Header>Insufficient ETH Balance</Card.Header>
        <br />
        <br />
        {showFaucet ? (
          <div>
            <p>
              {' '}
              You don&#39;t have enough Kovan test melon tokens (MLN-T) or Kovan
              test ether tokens (ETH-T). Current balances: {
                mlnBalance
              } MLN-T, {ethBalance} ETH-T
            </p>
            <p className="App-intro">
              To get started, head to our{' '}
              <strong>
                <a
                  href={`https://faucet.melon.network/${walletAddress}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  faucet
                </a>
              </strong>{' '}
              to receive Kovan Ether and Kovan Melon
            </p>
            <p className="App-intro">
              Once you have received ETH-T and MLN-T, go ahead and create your
              Melon fund.
            </p>
            <Button
              basic
              color="black"
              style={{ width: '100%' }}
              href={`https://faucet.melon.network/${walletAddress}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to faucet
            </Button>
          </div>
        ) : (
          <div>
            <p>Your account balance is empty.</p>
            <p>
              In order to proceed, please deposit the amount of ETH that you
              want to contribute plus at least 0.1 ETH to cover for gas costs to
              your wallet address:
            </p>
            <p>
              <strong>{walletAddress}</strong>
            </p>
          </div>
        )}
      </Card.Content>
    </Card>
  </div>
);

export default InsufficientFunds;

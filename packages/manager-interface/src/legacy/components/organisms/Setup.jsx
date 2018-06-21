import React from 'react';
import { Field } from 'redux-form';
import { List, Button, Card, Checkbox } from 'semantic-ui-react';
import { tracks } from '@melonproject/melon.js';

import renderInput from '../utils/renderInput';

// Explicitely decompose props here.
const Setup = ({ loading, handleSubmit, networkId, config, isCompetition }) => (
  <form onSubmit={handleSubmit}>
    <Card centered>
      <Card.Content>
        <div className={`ui ${loading ? 'active' : ''} inverted dimmer`}>
          <div className="ui text loader">
            Deploying your fund to the Ethereum blockchain
          </div>
        </div>

        <br />
        <Card.Header>Setup your fund</Card.Header>

        <List>
          <List.Item>
            <List.Content>
              <Field
                name="name"
                component={renderInput}
                className="left-input"
              />
            </List.Content>
          </List.Item>
          <br />
          <h4>Melon Default Configuration:</h4>
          <p>
            For this version, the modules that your fund will use are predefined
            ie. you do not need to choose a module. For your record, below are
            the predefined modules for this version.
          </p>
          <List.Item>
            <List.Content>Performance fee: 0%</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>Management fee: 0%</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <strong>Exchange:</strong>
              <br />
              <Checkbox disabled checked /> OasisDex
              <br />
              <Checkbox disabled checked /> 0x relayers
              <br />
              <br />
            </List.Content>
          </List.Item>
          <List.Item
            as="a"
            href={`https://${
              networkId === '42' ? 'kovan.' : ''
            }etherscan.io/address/${config.canonicalPriceFeedAddress}`}
            target="_blank"
          >
            <List.Content>
              Pricefeed: <strong>Canonical PriceFeed</strong>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              Asset Registrar: <strong>Melon Paros Asset Universe</strong>
            </List.Content>
          </List.Item>
          {isCompetition ? (
            <List.Item>
              <List.Content
                href={`https://${
                  networkId === '42' ? 'kovan.' : ''
                }etherscan.io/address/${config.competitionComplianceAddress}`}
                target="_blank"
              >
                Compliance (invest/redeem):{' '}
                <strong>Only Paros contribution contract can invest</strong>
              </List.Content>
            </List.Item>
          ) : (
            <List.Item>
              <List.Content
                href={`https://${
                  networkId === '42' ? 'kovan.' : ''
                }etherscan.io/address/${config.noCompetitionComplianceAddress}`}
                target="_blank"
              >
                Compliance (invest/redeem):{' '}
                <strong>Only manager can invest (in WETH)</strong>
              </List.Content>
            </List.Item>
          )}
          <List.Item>
            <List.Content>
              Risk Management: <strong>Disabled (all trades allowed)</strong>{' '}
            </List.Content>
          </List.Item>
        </List>

        <Button basic color="black" style={{ width: '100%' }}>
          Create and deploy my fund!
        </Button>
      </Card.Content>
    </Card>
  </form>
);

export default Setup;

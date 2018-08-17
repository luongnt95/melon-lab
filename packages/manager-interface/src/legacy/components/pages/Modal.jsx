import React from 'react';
import {
  Segment,
  Container,
  Card,
  Header,
  Loader,
  Button,
  Table,
} from 'semantic-ui-react';
import { Field } from 'redux-form';
import ReactModal from 'react-modal';
import renderInput from '../utils/renderInput';
import { add } from '../../utils/functionalBigNumber';
import displayNumber from '../../utils/displayNumber';
import ModalComponent from '@melonproject/manager-components/blocks/Modal';

export const types = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  CONFIRM: 'CONFIRM',
  PASSWORD: 'PASSWORD',
  INFO: 'INFO',
};

const Modal = ({
  isOpen,
  type,
  title,
  body,
  fees,
  method,
  gasPrice,
  primaryInteraction,
  secondaryInteraction,
  interactionHandler,
  handleSubmit,
  onAfterOpen,
}) => (
  <ModalComponent
    isOpen={isOpen}
    title={title}
    body={body}
    primaryInteraction={primaryInteraction}
    secondaryInteraction={secondaryInteraction}
    interactionHandler={interactionHandler}
    handleSubmit={handleSubmit}
    onAfterOpen={onAfterOpen}
    loading={type === types.LOADING}
    error={type === types.ERROR}
  >
    {method && type !== types.ERROR ? (
      <div>
        <p>
          The following method on the Melon Smart Contracts will be executed:
        </p>
        <h4>{method}</h4>
      </div>
    ) : null}

    {fees ? (
      <div>
        <Table compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Gas Limit</Table.HeaderCell>
              <Table.HeaderCell>Gas Price (Gwei)</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: 'right' }}>
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fees.map((entry, i) => (
              <Table.Row key={`fee-{i}`}>
                <Table.Cell>{entry.description}</Table.Cell>
                <Table.Cell>{entry.gasLimit}</Table.Cell>
                <Table.Cell>
                  <Field
                    name="gasPrice"
                    component={renderInput}
                    type="text"
                    placeholder={entry.gasPrice}
                  />
                </Table.Cell>
                <Table.Cell style={{ textAlign: 'right' }}>
                  Ξ {displayNumber((gasPrice * entry.gasLimit) / 10 ** 9)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell style={{ textAlign: 'right' }}>
                Ξ{' '}
                {displayNumber(
                  add(...fees.map(e => (e.gasLimit * gasPrice) / 10 ** 9)),
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <p>
          If you do not change the gas price field, the default gas price will
          be used. If you wish to set the gas price according to network
          conditions, please refer to{' '}
          <a href="https://ethgasstation.info/" target="_blank">
            {' '}
            Eth Gas Station.
          </a>{' '}
        </p>
        <br />
      </div>
    ) : null}

    {type === types.PASSWORD ? (
      <div style={{ marginBottom: 10 }}>
        <Field name="password" component={renderInput} type="password" />
      </div>
    ) : null}
  </ModalComponent>
);

export default Modal;

import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import { add } from '../../utils/functionalBigNumber';

import styles from './styles.css';

interface FormValues {
  gasPrice: number;
}

export interface FeeFormProps {
  values: FormValues;
  handleSubmit: () => void;
  handleReset: () => void;
  onCancel: () => void;
  handleBlur?: () => void;
  onChange?: () => void;
  touched?: any;
  errors?: any;
  gasPrice;
  fees;
}

export const FeeForm: StatelessComponent<FeeFormProps> = ({
  values,
  handleBlur,
  onChange,
  touched,
  errors,
  handleSubmit,
  onCancel,
  handleReset,
  gasPrice,
  fees,
}) => {
  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  return (
    <div className="fee-form">
      <style jsx>{styles}</style>
      <Form>
        <div className="fee-form__input">
          <Input
            value={values.gasPrice}
            type="number"
            label="Gas price"
            name="gasPrice"
            insideLabel="true"
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.gasPrice && errors.gasPrice}
          />
        </div>

        {fees && (
          <div>
            <Table>
              <TableHead>
                <Row isHead>
                  <CellHead>Description</CellHead>
                  <CellHead>Gas Limit</CellHead>
                  <CellHead>Total</CellHead>
                </Row>
              </TableHead>
              <TableBody>
                {fees.map((entry, i) => (
                  <Row key={`fee-${i}`}>
                    <CellBody>{entry.description}</CellBody>
                    <CellBody>{entry.gasLimit}</CellBody>
                    <CellBody>
                      Ξ {(values.gasPrice * entry.gasLimit) / 10 ** 9}
                    </CellBody>
                  </Row>
                ))}

                <Row>
                  <CellHead />
                  <CellHead />
                  <CellHead>
                    Ξ{' '}
                    {add(
                      ...fees.map(
                        e => (e.gasLimit * values.gasPrice) / 10 ** 9,
                      ),
                    )}
                  </CellHead>
                </Row>
              </TableBody>
            </Table>
            <p>
              If you do not change the gas price field, the default gas price
              will be used. If you wish to set the gas price according to
              network conditions, please refer to{' '}
              <a href="https://ethgasstation.info/" target="_blank">
                Eth Gas Station.
              </a>
            </p>
          </div>
        )}

        <div className="fee-form__buttons">
          <div className="fee-form__button">
            <Button type="button" style="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div className="fee-form__button">
            <Button type="submit" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FeeForm;

import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';

import styles from './styles.css';

interface FormValues {
  password: string;
}

export interface PasswordFormProps {
  values: FormValues;
  handleSubmit: () => void;
  handleReset: () => void;
  onCancel: () => void;
  handleBlur?: () => void;
  onChange?: () => void;
  touched?: any;
  errors?: any;
}

export const PasswordForm: StatelessComponent<PasswordFormProps> = ({
  values,
  handleBlur,
  onChange,
  touched,
  errors,
  handleSubmit,
  onCancel,
  handleReset,
}) => {
  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  return (
    <div className="password-form">
      <style jsx>{styles}</style>
      <Form>
        <div className="password-form__input">
          <Input
            value={values.password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            error={touched.password && errors.password}
          />
        </div>
        <div className="password-form__buttons">
          <div className="password-form__button">
            <Button type="button" style="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div className="password-form__button">
            <Button type="submit" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PasswordForm;

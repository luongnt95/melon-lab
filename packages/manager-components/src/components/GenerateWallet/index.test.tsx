import React from 'react';
import GenerateWallet from './container';

const onSubmitMnemonic = jest.fn();
const onSubmitPassword = jest.fn();

const data = {
  generatedMnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
  onSubmitPassword,
  onSubmitMnemonic,
  restoreWallet: {
    initialValues: {
      mnemonic: '',
    },
  },
  passwordForm: {
    initialValues: {
      password: 'abc',
    },
  },
};

describe('GenerateWallet', () => {
  const defaultElement = <GenerateWallet {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

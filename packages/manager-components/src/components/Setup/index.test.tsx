import React from 'react';
import Form from './';
import Setup from './container';

const onSubmit = jest.fn();

const data = {
  initialValues: {
    name: '',
  },
  config: {
    canonicalPriceFeedAddress: 'foo',
    competitionComplianceAddress: 'bar',
    onlyManagerCompetitionAddress: 'foo',
  },
  onSubmit,
};

describe('Setup', () => {
  const defaultElement = <Setup {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with loading', () => {
    tree.setProps({ loading: true });
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with isCompetition', () => {
    tree.setProps({ isCompetition: true });
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with networkId', () => {
    tree.setProps({ networkId: '42' });
    expect(tree).toMatchSnapshot();
  });

  it('should submit the form if valid', async () => {
    tree.setProps({ initialValues: { name: 'Fund name' } });
    await tree
      .find(Form)
      .props()
      .submitForm();
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Fund name' });
  });
});

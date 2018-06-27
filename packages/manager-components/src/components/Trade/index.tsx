import React, { StatelessComponent } from 'react';
import { TabContent, Tabs } from '~/blocks/Tabs';
import OrderForm from '~/components/OrderForm/container';

import styles from './styles.css';

export interface OrderFormProps {
  activeTabIndex: number;
  form: OrderForm;
  setTabIndex(index: number);
}

export const Trade: StatelessComponent<OrderFormProps> = ({
  activeTabIndex,
  setTabIndex,
  form,
}) => {
  return (
    <Tabs
      handleTabClick={index => setTabIndex(index)}
      activeTabIndex={activeTabIndex}
    >
      <style jsx>{styles}</style>
      <TabContent title="Take">
        <OrderForm {...form} strategy="Market" />
      </TabContent>
      <TabContent title="Place">
        <OrderForm {...form} strategy="Limit" />
      </TabContent>
    </Tabs>
  );
};

export default Trade;

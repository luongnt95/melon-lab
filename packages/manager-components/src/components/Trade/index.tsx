import React, { StatelessComponent } from 'react';
import { TabContent, Tabs } from '~/blocks/Tabs';
import OrderForm from '~/components/OrderForm/container';
import Layout from '../../design/Layout';

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
  const setActiveTab = index => setTabIndex(index);

  return (
    <div className="trade">
      <style jsx>{styles}</style>
      <Tabs handleTabClick={setActiveTab} activeTabIndex={activeTabIndex}>
        <TabContent title="Take">
          <OrderForm {...form} strategy="Market" />
        </TabContent>
        <TabContent title="Place">
          <OrderForm {...form} strategy="Limit" />
        </TabContent>
      </Tabs>
    </div>
  );
};

export default Trade;

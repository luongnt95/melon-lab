import classNames from 'classnames';
import * as R from 'ramda';
import React, { Fragment, ReactNode, StatelessComponent } from 'react';

import styles from './styles.css';

export interface TabsProps {
  children: ReactNode;
  activeTabIndex: number;
  handleTabClick(index: number);
}

export interface TabContentProps {
  title: string;
}

const TabContent: StatelessComponent<TabContentProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

const getTabs: any = R.compose(
  R.values,
  R.filter(({ type }) => (type === TabContent || type.displayName === 'TabContent')),
);

const Tabs: StatelessComponent<TabsProps> = ({
  children,
  activeTabIndex,
  handleTabClick,
}) => {
  const activeTabContent = getTabs(children).map((child, index) => {
    const classname = classNames('tabs__content', {
      'tabs__content--active': activeTabIndex === index,
    });

    return (
      <div className={classname} key={index}>
        {child}
      </div>
    );
  });

  const handleKeyPress = (index) => (e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode === 39 && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    } else if (keycode === 37 && e.target.previousElementSibling) {
      e.target.previousElementSibling.focus();
    } else if (keycode === 13){
      handleTabClick(index);
    }
  }

  const tabs = getTabs(children).map((child, index) => {
    const classname = classNames('tabs__tab', {
      'tabs__tab--active': activeTabIndex === index,
    });
    const title = child.props.title;

    return (
      <div
        aria-label={title}
        aria-selected={activeTabIndex === index ? true : false}
        className={classname}
        onClick={() => handleTabClick(index)}
        onKeyPress={handleKeyPress(index)}
        onKeyDown={handleKeyPress(index)}
        key={index}
        tabIndex={1}
      >
        {title}
      </div>
    );
  });

  return (
    <div className="tabs" role="tablist">
      <style jsx>{styles}</style>
      <div className="tabs__nav">{tabs}</div>
      {activeTabContent}
    </div>
  );
};

export { Tabs, TabContent };

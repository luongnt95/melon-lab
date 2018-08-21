import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface NotificationProps {
  isInline?: boolean;
  isWarning?: boolean;
  isError?: boolean;
  isClosable?: boolean;
}

const Notification: StatelessComponent<NotificationProps> = ({
  children,
  isInline,
  isWarning,
  isError,
  isClosable,
}) => {
  const notificationClassNames = classNames('notification', {
    'notification--inline': isInline,
    'notification--warning': isWarning,
    'notification--error': isError,
    'notification--is-closable': isClosable,
  });

  return (
    <div className={notificationClassNames}>
      <style jsx>{styles}</style>
      {children}
      {isClosable && <button className="notification__close">&times;</button>}
    </div>
  );
};

export default Notification;

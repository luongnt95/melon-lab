import { types as modalTypes } from '../components/pages/Modal';

export const types = {
  OPEN: 'OPEN:modal:melon.fund',
  CLOSE: 'CLOSE:modal:melon.fund',
  CANCEL: 'CANCEL:modal:melon.fund',
  CONFIRM: 'CONFIRM:modal:melon.fund',
  CONFIRMED: 'CONFIRMED:modal:melon.fund',
  ERROR: 'ERROR:modal:melon.fund',
  LOADING: 'LOADING:modal.melon.fund',
  PASSWORD: 'PASSWORD:modal.melon.fund',
  PASSWORD_ENTERED: 'PASSWORD_ENTERED:modal:melon.fund',
};

// Actions bound to the buttons
export const interactions = {
  OK: 'Ok',
  CANCEL: 'Cancel',
  CONFIRM: 'Confirm',
  PASSWORD: 'Enter',
  RETRY: 'Retry',
};

export const actions = {
  open: ({ title, body, primaryInteraction, secondaryInteraction, fees }) => ({
    type: types.OPEN,
    isOpen: true,
    modalType: modalTypes.INFO,
    title,
    body,
    fees,
    method: null,
    primaryInteraction,
    secondaryInteraction,
  }),
  info: ({ title, body }) => ({
    type: types.OPEN,
    isOpen: true,
    modalType: modalTypes.INFO,
    title,
    body,
    fees: null,
    primaryInteraction: interactions.OK,
    secondaryInteraction: null,
    method: null,
  }),
  close: () => ({
    type: types.CLOSE,
    isOpen: false,
  }),
  cancel: () => ({
    type: types.CANCEL,
    isOpen: false,
  }),
  confirm: ({ body, fees, method }) => ({
    type: types.CONFIRM,
    isOpen: true,
    modalType: modalTypes.CONFIRM,
    title: 'Confirm',
    body,
    fees,
    method,
    primaryInteraction: interactions.CONFIRM,
    secondaryInteraction: interactions.CANCEL,
  }),
  confirmed: gasPrice => ({
    type: types.CONFIRMED,

    gasPrice,
    isOpen: false,
  }),
  password: body => ({
    type: types.PASSWORD,
    isOpen: true,
    modalType: modalTypes.PASSWORD,
    title: 'Enter password',
    body,
    method: null,
  }),
  passwordEntered: password => ({
    type: types.PASSWORD_ENTERED,
    isOpen: false,
    password,
  }),
  error: body => ({
    type: types.ERROR,
    isOpen: true,
    modalType: modalTypes.ERROR,
    title: 'Error',
    body,
    fees: null,
    primaryInteraction: interactions.OK,
    secondaryInteraction: '',
  }),
  fatal: body => ({
    type: types.ERROR,
    isOpen: true,
    modalType: modalTypes.ERROR,
    title: 'Fatal Error',
    body,
    fees: null,
    primaryInteraction: '',
    secondaryInteraction: '',
  }),
  loading: (body = 'Sending transaction ...') => ({
    type: types.LOADING,
    fees: null,
    isOpen: true,
    modalType: modalTypes.LOADING,
    title: 'Please wait',
    body,
    fees: null,
  }),
};

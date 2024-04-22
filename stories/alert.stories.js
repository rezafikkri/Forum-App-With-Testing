import Alert from '@/components/alert';

export default {
  title: 'Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['info', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export const Info = {
  args: {
    message: 'This is info message',
    onClose: () => {},
    type: 'info',
  },
};

export const Danger = {
  args: {
    message: 'This is danger message',
    onClose: () => {},
    type: 'danger',
  },
};

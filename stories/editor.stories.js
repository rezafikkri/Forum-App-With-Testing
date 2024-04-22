import Editor from '@/components/editor';

export default {
  title: 'Editor',
  component: Editor,
  tags: ['autodocs'],
};

export const WithDefaultValue = {
  args: {
    value: 'This is *content* and `code`',
    placeholder: 'This is placeholder...',
    onValueChange: () => {},
  },
};

export const WithoutDefaultValue = {
  args: {
    value: '',
    placeholder: 'This is placeholder...',
    onValueChange: () => {},
  },
};

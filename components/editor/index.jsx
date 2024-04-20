'use client';

import PropTypes from 'prop-types';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import SanitizeHTML from '../sanitize-html';
import { CodePreview, CodeEdit } from './preview';

import '../../styles/editor.css';

export default function Editor({ value, onValueChange, placeholder }) {
  function customPreview(source) {
    const contentHTML = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(source);

    return <SanitizeHTML className="prose text-gray-800" html={String(contentHTML)} />;
  }

  const commandsFilter = (command) => {
    // modify command icon
    switch (command.name) {
      case 'bold':
        return { ...command, icon: <i className="bi bi-type-bold text-lg" /> };
      case 'italic':
        return { ...command, icon: <i className="bi bi-type-italic text-lg" /> };
      case 'link':
        return { ...command, icon: <i className="bi bi-link-45deg text-lg" /> };
      case 'code':
        return { ...command, icon: <i className="bi bi-code text-lg" /> };
      case 'image':
        return { ...command, icon: <i className="bi bi-card-image text-lg" /> };
      default:
        return command;
    }
  };

  const codePreview = {
    name: 'preview',
    keyCommand: 'preview',
    value: 'preview',
    icon: <CodePreview />,
  };

  const codeEdit = {
    name: 'edit',
    keyCommand: 'preview',
    value: 'edit',
    icon: <CodeEdit />,
  };

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onValueChange}
        textareaProps={{ placeholder }}
        preview="edit"
        commands={[
          codeEdit,
          codePreview,
        ]}
        extraCommands={[
          commands.bold,
          commands.italic,
          commands.link,
          commands.code,
          commands.image,
        ]}
        commandsFilter={commandsFilter}
        components={{
          preview: customPreview,
        }}
        className="editor"
      />
    </div>
  );
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

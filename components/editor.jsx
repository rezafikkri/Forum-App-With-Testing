'use client';

import PropTypes from 'prop-types';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import SanitizeHTML from './sanitize-html';

import '../styles/editor.css';

export default function Editor({ value, onValueChange, placeholder }) {
  function customPreview(source, store, dispatch) {
    const contentHTML = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(source);
    
    return <SanitizeHTML className="prose" html={String(contentHTML)} />;
  }

  const commandsFilter = (command, isExtra) => {
    // disabled unnecessary command and modify command icon
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
        return { ...command, icon: <i className="bi bi-card-image text-lg" /> }
      case 'preview':
        return { ...command, icon: <span className="">Preview</span> };
      case 'edit':
        return { ...command, icon: <span className="">Write</span> };
      default:
        return command;
    }
  };

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onValueChange}
        textareaProps={{ placeholder }}
        preview="edit"
        commands={[
          commands.codeEdit,
          commands.codePreview,
        ]}
        extraCommands={[
          commands.bold,
          commands.italic,
          commands.link,
          commands.code,
          commands.image,
        ]}
        commandsFilter={commandsFilter}
        minHeight="100%"
        components={{
          preview: customPreview,
        }}
      />
    </div>
  );
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

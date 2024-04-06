import { EditorContext } from '@uiw/react-md-editor';
import { useContext } from 'react';

export function CodePreview() {
  const { preview, dispatch } = useContext(EditorContext);

  function handleClick(e) {
    e.stopPropagation();

    dispatch({ preview: 'preview' });
  }

  return (
    <button type="button" title="Preview thread body" onClick={handleClick}>
      <span>Preview</span>
    </button>
  );
}

export function CodeEdit() {
  const { preview, dispatch } = useContext(EditorContext);

  function handleClick(e) {
    e.stopPropagation();

    dispatch({ preview: 'edit' });
  }

  return (
    <button type="button" title="Edit thread body" onClick={handleClick}>
      <span>Write</span>
    </button>
  );
}

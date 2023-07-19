import { useState } from "react";
/// WYSIWYG
import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WYSIWYG = ({ setEditorState, setEditorBlur, onError, editorBlur }) => {
  const [editorData, setEditorData] = useState({
    editorState: EditorState.createEmpty(),
  });

  const onEditorStateChange = (editorData) => {
    let HTMLdata = stateToHTML(editorData.getCurrentContent());
    setEditorData({
      editorState: editorData
    })
    setEditorState(HTMLdata);
  }

  const check4Error = () => {
    if (onError || (onError && editorBlur)) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <Editor
        editorState={editorData.editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName={`demo-wrapper ${check4Error() ? 'error' : ''}`}
        editorClassName="demo-editor"
        onBlur={setEditorBlur}
      />
    </div>
  );
};

export default WYSIWYG;

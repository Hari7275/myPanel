// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const RichTextEditor = ({
//   value,
//   onChange,
//   placeholder = "Write something...",
//   height = "200px",
// }) => {
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 5, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ direction: "rtl" }],
//       [{ color: [] }, { background: [] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "script",
//     "indent",
//     "direction",
//     "color",
//     "background",
//     "font",
//     "align",
//     "link",
//     "image",
//     "video",
//   ];

//   return (
//     <ReactQuill
//       theme="snow"
//       value={value}
//       onChange={onChange}
//       modules={modules}
//       formats={formats}
//       placeholder={placeholder}
//       style={{ height, marginBottom: "50px" }}
//     />
//   );
// };

// export default RichTextEditor;


import React, { useRef, useMemo, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Register custom Drop Cap format BEFORE component definition
const Inline = Quill.import('blots/inline');

class DropCapBlot extends Inline {
  static blotName = 'dropcap';
  static tagName = 'span';
  static className = 'drop-cap';
  
  static create(value) {
    let node = super.create();
    node.setAttribute('data-dropcap', 'true');
    return node;
  }
  
  static formats(node) {
    return node.getAttribute('data-dropcap') === 'true';
  }
}

// Register only once
if (!Quill.imports['formats/dropcap']) {
  Quill.register(DropCapBlot, true);
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  height = "200px",
}) => {
  const quillRef = useRef(null);

  // Custom handler for drop cap
  const toggleDropCap = () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection();
    if (range && range.length > 0) {
      const format = editor.getFormat(range);
      editor.formatText(range.index, range.length, 'dropcap', !format.dropcap);
    }
  };

  // Update button state when selection changes
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const updateButtonState = () => {
      const range = editor.getSelection();
      if (range) {
        const format = editor.getFormat(range);
        const button = document.querySelector('.ql-dropcap');
        if (button) {
          if (format.dropcap) {
            button.classList.add('ql-active');
          } else {
            button.classList.remove('ql-active');
          }
        }
      }
    };

    editor.on('selection-change', updateButtonState);
    editor.on('text-change', updateButtonState);

    return () => {
      editor.off('selection-change', updateButtonState);
      editor.off('text-change', updateButtonState);
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 5, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["dropcap"], // Add drop cap button
        ["clean"],
      ],
      handlers: {
        dropcap: toggleDropCap,
      },
    },
  }), []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
    "video",
    "dropcap",
  ];

  return (
    <div>
      <style>{`
        /* Drop cap button icon */
        .ql-dropcap:after {
          content: "A";
          font-size: 18px;
          font-weight: bold;
        }

        /* Active state for drop cap button */
        .ql-dropcap.ql-active {
          background-color: #06c !important;
          color: white !important;
        }

        .ql-dropcap.ql-active:after {
          color: white !important;
        }

        /* Drop cap styling - EXACT match to Sanity */
        .ql-editor .drop-cap {
          float: left !important;
          font-size: 66px !important;
          padding-top: 5px !important;
          line-height: 0.83 !important;
          margin-right: 5px !important;
          display: block !important;
          position: relative !important;
        }

        /* Remove background in editor for cleaner look */
        .ql-editor .drop-cap {
          background-color: transparent;
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height, marginBottom: "50px" }}
      />
    </div>
  );
};

export default RichTextEditor;
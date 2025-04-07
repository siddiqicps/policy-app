import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
// import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup, ImportExport, SlashMenu } from '@syncfusion/ej2-react-richtexteditor';
// import { ToolbarSettingsModel, ActionBeginEventArgs, FileManager, FileManagerSettingsModel, QuickToolbarSettingsModel, SlashMenuSettingsModel, ImportWordModel, ExportWordModel, ExportPdfModel } from '@syncfusion/ej2-react-richtexteditor';
// import { createElement } from '@syncfusion/ej2-base';
// import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
// import * as CodeMirror from 'codemirror';
// import { Editor as ICodeMirror } from 'codemirror';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/css/css.js';
// import 'codemirror/mode/htmlmixed/htmlmixed.js';
// import './tools.css';



export default function PolicyEdit() {
  // const docs = [
  //   { uri: "http://localhost:3000/static/1742583077592-Backup Policy_v1.1_2025 - Copy.docx" }, // Remote file
  // ];
  const [html, setHtml] = useState('');
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]



  // const handlePolicyData = async () => {
  //   const file = await getPolicyData();
  //   const result = await mammoth.convertToHtml({
  //     arrayBuffer: file,
  //   });

  //   setHtml(result.value);
  // };

  useEffect(()=>{
    getPolicyData()
  },[])

  const getPolicyData = async () => {
      try {
        // const url = process.env.API_URL+':'+process.env.API_PORT
        const url = import.meta.env.VITE_API_URL
        const result = await fetch(`${url}/get-policy-text`);
  
        const data = await result.json();
        console.log(data);
        // setHtml(data.html);
        setValue(data.text)
        // return data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
  };

  const savePolicyData = async () => {
    try{
      // const url = process.env.REACT_APP_API_URL+':'+process.env.REACT_APP_API_PORT
      const url = import.meta.env.VITE_API_URL
      // const formData = new FormData();
      // formData.append('title', title)
      // formData.append('content', value)
      const payload = {title: title, content: value, version: '1.0.0'}
      const result = await fetch(`${url}/save-policy-text`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await result.json()
    }catch(err){

    }
  }

  return (
    <main className="flex items-center justify-center pt-7 pb-4">
      <div className="aks">
        <div className="fy vy cwy dwm">
          <div className="sm:col-span-4 mb-5">
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Policy Title</label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Enter policy title here</div> */}
                <input type="text" name="title" id="title" 
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                  placeholder="Enter policy title here" onChange={(e) => setTitle(e.target.value)}/>
              </div>
            </div>
          </div> 
          <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
          {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
          {/* <RichTextEditorComponent id="toolsRTE"><Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} /></RichTextEditorComponent> */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* <button type="button" className="text-sm/6 font-semibold text-gray-900">Cancel</button> */}
            <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={savePolicyData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

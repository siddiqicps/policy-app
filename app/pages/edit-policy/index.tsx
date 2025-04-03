import { useEffect, useState } from "react";

// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


export default function PolicyEdit() {
  // const docs = [
  //   { uri: "http://localhost:3000/static/1742583077592-Backup Policy_v1.1_2025 - Copy.docx" }, // Remote file
  // ];
  const [html, setHtml] = useState('');
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

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
        const result = await fetch('http://localhost:3001/get-policy-text');
  
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
      // const formData = new FormData();
      // formData.append('title', title)
      // formData.append('content', value)
      const payload = {title: title, content: value, version: '1.0.0'}
      const result = await fetch("http://localhost:3001/save-policy-text",{
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
          <ReactQuill theme="snow" value={value} onChange={setValue} />
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

import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from "react";
import mammoth from "mammoth";

// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

export default function PolicyView() {
  // const docs = [
  //   { uri: "http://localhost:3000/static/1742583077592-Backup Policy_v1.1_2025 - Copy.docx" }, // Remote file
  // ];
  const [html, setHtml] = useState("");

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
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch('http://localhost:3000/get-policy-text');
  
        const policy = await result.json();
        console.log(policy.data[0].content);
        setHtml(policy.data[0].content);
        // return data;
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <main className="flex items-center justify-center pt-7 pb-4">
      <div className="aks">
        <div className="fy vy cwy dwm"> 
          <div  dangerouslySetInnerHTML={{ __html: html }} />
          {/* <DocViewer documents={docs} initialActiveDocument={docs[0]} pluginRenderers={DocViewerRenderers} /> */}
        </div>
      </div>
    </main>
  );
}

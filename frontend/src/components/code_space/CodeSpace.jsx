import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducerContants } from "../../redux/constant";
import CodeEditor from '@uiw/react-textarea-code-editor';



function CodeSpace() {
  const dispatch = useDispatch();
  const isEditior = useSelector((state) => state.is_editior);
  const submissions = useSelector((state) => state.submissions);
  const [code, setCode] = useState(`def add(a, b): \n  return a + b\n`);
  const font_size = useSelector(state => state.font_size)

  console.log(submissions.previous_code);

  function codeSaver(e) {
    const code = e.target.value;
    console.log(code);
    dispatch({ type: reducerContants.CODE, payload: code });
  }

function formatCodeObjectString(codeObjectString) {
  // Regular expression pattern to extract relevant information
  const pattern = /<code object (.+?) at (.+?), file '(.+?)', line (\d+)>/;
  
  // Use the pattern to match and extract information
  const matches = codeObjectString.match(pattern);

  // Check if there are matches
  if (matches && matches.length === 5) {
      // Extracted information
      const objectType = matches[1];
      const memoryAddress = matches[2];
      const fileName = matches[3];
      const lineNumber = matches[4];

      // Format the extracted information
      const formattedString = `Object type: ${objectType}\nMemory address: ${memoryAddress}\nFile: ${fileName}, Line: ${lineNumber}`;
    
      return formattedString;
  } else {
      // If no matches found or incorrect format, return original string
      return codeObjectString;
  }
}

  return (
    <div id="CodeSpace">
      <div className="m-2 rounded codie-space">
        {isEditior ? (
          <CodeEditor
          value={code}
          language="python"
          onBlur={codeSaver}
          placeholder="Please enter python code here..."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          
          style={{
            backgroundColor: "var(--background-color-main)",
            width: '100%',
            height:'100%',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            fontSize:`${font_size}px`
          }}
        />
        ) : (
          <div className="overflow-auto h-100 p-2">
            {submissions?.previous_code?.length 
            ?
              submissions?.previous_code?.map((submission, id) => (
                <div key={id} style={{ color: "white" }}>
                  <div className="status"> status of code:- <span style={{ color: submission.status ==`Executed` ? 'green' : 'red'}}>{submission.status}</span></div>
                  <div className="code">
                  {submission.code}
                  </div>
                  <div className="compile_code" style={{ color: submission.status ==`Executed` ? 'green' : 'red'}}>{formatCodeObjectString(submission.compile_code)}</div>
                </div>
              ))
            :
            <div>No previous submissions found.</div>
          }
          </div>
        )}

      </div>
    </div>
  );
}

export default CodeSpace;

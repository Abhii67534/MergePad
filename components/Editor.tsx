"use client"


import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HeadingNode } from '@lexical/rich-text'

import FormattingToolbar from './FormattingToolbar';


interface Props{}

const theme = {
    heading:{
        h1:"text-3xl font-bold",
        h2:"text-2xl font-bold",
        h3:"text-xl font-bold"
    },
    text:{
        bold:"bold",
        italic:"italic"
    }
    
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error:Error) {
  console.error(error);
}

export function Editor({}:Props):JSX.Element {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    nodes:[
        HeadingNode
    ],
    onError,
  };

  return (
    // base of Lexical editior . Takes initial config and renders it 
    <LexicalComposer initialConfig={initialConfig}>
        <FormattingToolbar/>
      <RichTextPlugin
        contentEditable={<ContentEditable className=" h-screen p-3 text-white" />}
        placeholder={<div className='text-white absolute top-[90px] left-5'>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

// Plain text plugin --> Listen for user events that listen keyboard events or mouse events
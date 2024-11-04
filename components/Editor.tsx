"use client"

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from '@lexical/rich-text';
import { liveblocksConfig, LiveblocksPlugin } from "@liveblocks/react-lexical";
import FormattingToolbar from './FormattingToolbar';



const theme = {
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-bold",
  },
  text: {
    bold: "bold",
    italic: "italic",
  },
};

function onError(error: Error) {
  console.error(error);
}

export function Editor(): JSX.Element {
  const initialConfig = liveblocksConfig({
    namespace: 'MyEditor',
    theme,
    nodes: [HeadingNode],
    onError,
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <FormattingToolbar />
      <RichTextPlugin
        contentEditable={<ContentEditable className="h-screen p-3 text-white" />}
        placeholder={<div className="text-white absolute top-[125px] left-5">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <LiveblocksPlugin />
    </LexicalComposer>
  );
}

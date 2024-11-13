"use client";

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from '@lexical/rich-text';
import { FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin } from "@liveblocks/react-lexical";
import FormattingToolbar from './FormattingToolbar';
import { useThreads } from '@liveblocks/react/suspense';

type UserType = "creator" | "editor" | "viewer";

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

export function Editor({ roomId, currentUserType }: { roomId: string, currentUserType: UserType }): JSX.Element {
  const initialConfig = liveblocksConfig({
    namespace: 'MyEditor',
    theme,
    nodes: [HeadingNode],
    onError,
    editable: currentUserType === 'editor',
  });

  const { threads } = useThreads();

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <FormattingToolbar />
      <div className="relative">
        <RichTextPlugin
          contentEditable={<ContentEditable className="h-[70vh] sm:h-[80vh] md:h-[90vh] w-full p-3 text-white" />}
          placeholder={<div className="text-white absolute left-2 top-3 text-xs sm:text-sm md:text-base px-3 py-1 pointer-events-none">
            Enter some text...
          </div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
      <LiveblocksPlugin>
        <div className="sm:w-80 md:w-96 w-full mx-auto">
          <FloatingComposer style={{ width: "100%" }} />
        </div>
        <FloatingThreads threads={threads} />
      </LiveblocksPlugin>
    </LexicalComposer>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";

const FormattingToolbar = () => {
  const LowPriority = 1;
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const handleFormatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const handleHeading = (level) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(`h${level}`));
      }
    });
  };

  return (
    <div className="bg-dark-theme-nav flex items-center pl-2 space-x-2">
      <button
        className="flex items-center"
        onClick={() => handleFormatText("undo")}
        aria-label="Undo"
      >
        <img className="h-[18px] mr-2" src="/undo.png" alt="Undo" />
      </button>
      <button
        className="flex items-center"
        onClick={() => handleFormatText("redo")}
        aria-label="Redo"
      >
        <img className="h-[18px] mr-2" src="/redo.png" alt="Redo" />
      </button>

      <button
        className={`editor-tools-font flex items-center mr-2 ${isBold ? "bg-slate-700 rounded-sm" : ""}`}
        onClick={() => handleFormatText("bold")}
        aria-label="Bold"
      >
        B
      </button>

      <button
        className={`editor-tools-font flex items-center mr-2 ${isItalic ? "bg-slate-700 rounded-sm" : ""}`}
        onClick={() => handleFormatText("italic")}
        aria-label="Italic"
      >
        I
      </button>

      {['H1', 'H2', 'H3'].map((heading, index) => (
        <button
          key={heading}
          className="editor-tools-font flex items-center mr-2"
          onClick={() => handleHeading(index + 1)}
          aria-label={`Heading ${index + 1}`}
        >
          {heading}
        </button>
      ))}
    </div>
  );
};

export default FormattingToolbar;

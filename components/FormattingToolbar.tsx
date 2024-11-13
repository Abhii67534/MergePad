"use client"
import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import {  $createHeadingNode } from "@lexical/rich-text";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import { OPEN_FLOATING_COMPOSER_COMMAND } from "@liveblocks/react-lexical";
import Image from "next/image";

const FormattingToolbar = () => {
  const LowPriority = 1;
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Check for bold and italic formatting in the current selection
      const isBold = selection.hasFormat("bold");
      const isItalic = selection.hasFormat("italic");
  
      // Update the toolbar states accordingly
      setIsBold(isBold);
      setIsItalic(isItalic);
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

  const handleBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };
  const handleItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const handleH1 = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h1"));
      }
    });
  };

  const handleH2 = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h2"));
      }
    });
  };

  const handleH3 = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h3"));
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#0b1320] to-[#1b263b border-blue-700 flex items-center content-center justify-center pl-2 gap-3 space-x-2 py-1">
      <button
       className=" flex items-center" 
       onClick={()=>{
        editor.dispatchCommand(UNDO_COMMAND,undefined)
       }}>
        <img className="h-[18px] mb-[5px] mr-2" src="/undo.png" alt="undo" />
      </button>
      <button 
      className=" flex items-center" 
      onClick={()=>{
        editor.dispatchCommand(REDO_COMMAND,undefined)
       }}>
        <img className="h-[18px] mb-[5px] mr-2" src="/redo.png" alt="undo" />
      </button>

      <button
        className={`editor-tools-font flex items-center mr-2 ${
          isBold ? "bg-slate-700 rounded-sm" : ""
        }`}
        onClick={handleBold}
      >
        B
      </button>

      <button
        className={`editor-tools-font flex items-center mr-2 ${
          isItalic ? "bg-slate-700 rounded-sm" : ""
        }`}
        onClick={handleItalic}
      >
        I
      </button>

      <button className=" flex items-center " onClick={handleH3}>
        <img className="h-[15px] mb-[5px] mr-2" src="/underline.png" alt="undo"/>
      </button>

      <button
        className="editor-tools-font flex items-center mr-2"
        onClick={handleH1}
      >
        H1
      </button>

      <button
        className="editor-tools-font flex items-center mr-2"
        onClick={handleH2}
      >
        H2
      </button>

      <button
        className="editor-tools-font flex items-center mr-2"
        onClick={handleH3}
      >
        H3
      </button>

      <button
      className="flex items-center"
        onClick={() =>
          editor.dispatchCommand(OPEN_FLOATING_COMPOSER_COMMAND, undefined)
        }
      >
        <img className="h-[18px] mb-[5px] mr-2" src="/comment.png" alt="undo" />
      </button>
    </div>
  );
};

export default FormattingToolbar;

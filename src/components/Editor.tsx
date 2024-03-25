"use client";
import EditorJS from "@editorjs/editorjs";
import classes from "../styles/editorjs.module.css";
import { useEffect, useRef } from "react";
import { EDITOR_CONFIG } from "../configs/editorjs.config";

const Editor = ({ value, onChange, holder }: any) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_CONFIG,
        placeholder: "Write something...",
        data: value,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });

      // @ts-ignore
      ref.current = editor as EditorJS;
    }

    return () => {
      if (ref.current && (ref.current as { destroy?: () => void }).destroy) {
        (ref.current as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return <div id={holder} className={classes.editorjs} />;
};

export default Editor;

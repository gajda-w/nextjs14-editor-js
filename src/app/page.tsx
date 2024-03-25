"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export type DataProps = {
  blocks: {
    id: string;
    type: string; // can specify types here depends of the block
    data: unknown;
  }[];
};

export default function Home() {
  const [data, setData] = useState<DataProps>();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    console.log(data);
  };

  return (
    <div className="p-8">
      <div className="flex justify-end">
        {isEditing ? (
          <button className="px-4 py-2 bg-slate-300" onClick={handleSave}>
            save
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-slate-300"
            onClick={() => setIsEditing(true)}
          >
            edit
          </button>
        )}
      </div>
      {isEditing ? (
        <Editor value={data} onChange={setData} holder="editorjs-container" />
      ) : (
        <div>
          {data?.blocks?.map((block, index) => (
            <div className="flex" key={index}>
              <div>{index}. </div>
              <div key={block.id}>{JSON.stringify(block)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

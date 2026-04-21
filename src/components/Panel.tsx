"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PanelId } from "@/hooks/usePanelState";
import { PanelDragContext } from "./contexts/PanelDragContext";

interface PanelProps {
  id: PanelId;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Panel({ id, title, onClose, children }: PanelProps) {
  const dragHandleProps = React.useContext(PanelDragContext);

  return (
    <div
      className="flex flex-col bg-white shadow-md h-full w-full"
      data-panel-id={id}
    >
      <div
        className="flex items-center justify-between p-4 border-b cursor-grab"
        {...dragHandleProps}
      >
        <h2 className="font-semibold text-gray-800 select-none">{title}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  );
}

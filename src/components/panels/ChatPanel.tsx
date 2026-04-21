'use client';

import Panel from '../Panel';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  return (
    <Panel id="chat" title="Chat" onClose={onClose}>
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <ChatBubbleBottomCenterIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Chat Content</p>
        </div>
      </div>
    </Panel>
  );
}

'use client';

import Panel from '../Panel';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';

interface MusicPanelProps {
  onClose: () => void;
}

export default function MusicPanel({ onClose }: MusicPanelProps) {
  return (
    <Panel id="music" title="Music" onClose={onClose}>
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <MusicalNoteIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Music Content</p>
        </div>
      </div>
    </Panel>
  );
}

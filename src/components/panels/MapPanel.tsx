'use client';

import Panel from '../Panel';
import { MapIcon } from '@heroicons/react/24/outline';

interface MapPanelProps {
  onClose: () => void;
}

export default function MapPanel({ onClose }: MapPanelProps) {
  return (
    <Panel id="map" title="Map" onClose={onClose}>
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Map Content</p>
        </div>
      </div>
    </Panel>
  );
}

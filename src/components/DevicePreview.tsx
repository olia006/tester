import { useState } from 'react';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import './DevicePreview.css';

interface DevicePreviewProps {
  url: string;
  name: string;
  width: number;
  height: number;
}

export function DevicePreview({ url, name, width, height }: DevicePreviewProps) {
  const [isLandscape, setIsLandscape] = useState(false);

  const handleRotate = () => {
    setIsLandscape(!isLandscape);
  };

  const openInDeviceView = () => {
    const finalWidth = isLandscape ? height : width;
    const finalHeight = isLandscape ? width : height;
    const left = (window.screen.width - finalWidth) / 2;
    const top = (window.screen.height - finalHeight) / 2;

    window.open(
      url,
      `${name}-preview`,
      `width=${finalWidth},height=${finalHeight},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
    );
  };

  const deviceStyles = {
    '--device-width': `${isLandscape ? height : width}px`,
    '--device-height': `${isLandscape ? width : height}px`,
  } as React.CSSProperties;

  return (
    <div className="device-preview">
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">{name}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleRotate}
            className="p-2 hover:bg-gray-700 rounded-full"
            title="Rotate device"
          >
            <ArrowsPointingOutIcon className="w-5 h-5" />
          </button>
          <button
            onClick={openInDeviceView}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            Open Preview
          </button>
        </div>
      </div>
      
      <div
        className={`device-frame ${isLandscape ? 'landscape' : ''} bg-gray-50`}
        style={deviceStyles}
      >
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="text-gray-500 mb-2">
            {isLandscape ? `${height}x${width}` : `${width}x${height}`}
          </div>
          <div className="text-sm text-gray-400">
            Click "Open Preview" to view the website in this size
          </div>
        </div>
      </div>
    </div>
  );
} 
import { useState } from 'react';
import { DevicePreview } from './components/DevicePreview';
import { create } from 'zustand';

interface Device {
  name: string;
  width: number;
  height: number;
  userAgent?: string;
}

interface DeviceStore {
  devices: Device[];
  selectedDevices: string[];
  toggleDevice: (name: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
}

const devices: Device[] = [
  { name: 'iPhone 11 (Safari)', width: 414, height: 896 },
  { name: 'iPhone 12 (Safari)', width: 390, height: 844 },
  { name: 'iPhone 15 (Safari)', width: 393, height: 852 },
  { name: 'iPhone 16 (Safari)', width: 430, height: 932 },
  { name: 'iPhone 16 Pro Max (Safari)', width: 430, height: 932 },
  { name: 'iPad Mini (Safari)', width: 768, height: 1024 },
  { name: 'iPad Pro (Safari)', width: 1024, height: 1366 },
  { name: 'MacBook Air (Safari/Chrome)', width: 1280, height: 800 },
  { name: 'MacBook Pro (Safari/Chrome)', width: 1440, height: 900 },
  { name: 'Galaxy S22 (Chrome)', width: 412, height: 915 },
  { name: 'Galaxy S24 (Chrome)', width: 432, height: 960 },
];

// Websites that typically work well in iframes
const exampleUrls = [
  'https://example.com',
  'https://httpbin.org',
  'https://placeholder.com',
  'https://via.placeholder.com/800x600',
  'https://picsum.photos/800/600',
];

const useDeviceStore = create<DeviceStore>((set) => ({
  devices,
  selectedDevices: devices.map(d => d.name),
  toggleDevice: (name) =>
    set((state) => ({
      selectedDevices: state.selectedDevices.includes(name)
        ? state.selectedDevices.filter((d) => d !== name)
        : [...state.selectedDevices, name],
    })),
  selectAll: () =>
    set((state) => ({
      selectedDevices: state.devices.map((d) => d.name),
    })),
  deselectAll: () =>
    set(() => ({
      selectedDevices: [],
    })),
}));

function App() {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const { devices, selectedDevices, toggleDevice, selectAll, deselectAll } = useDeviceStore();

  const handleUrlChange = (input: string) => {
    setUrl(input);
    try {
      new URL(input);
      setIsValidUrl(true);
    } catch {
      setIsValidUrl(input === '' || input.startsWith('http'));
    }
  };

  const tryExampleUrl = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setIsValidUrl(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Responsive Tester</h1>
          <p className="text-gray-600">Preview how your website looks across different devices</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="url-input" className="text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <input
                id="url-input"
                type="text"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                  isValidUrl ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
                placeholder="Enter website URL (e.g. https://example.com)"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
              {!isValidUrl && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>

            {/* Example URLs */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Try these example URLs (iframe-friendly):
              </label>
              <div className="flex flex-wrap gap-2">
                {exampleUrls.map((exampleUrl) => (
                  <button
                    key={exampleUrl}
                    onClick={() => tryExampleUrl(exampleUrl)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    {exampleUrl.replace('https://', '')}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                📝 Note: Many websites (Google, Facebook, GitHub, etc.) block iframe embedding for security. 
                If a site doesn't load, try the "Open in New Tab" button or use your own website.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Select Devices</label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {devices.map((device) => (
                  <label
                    key={device.name}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDevices.includes(device.name)}
                      onChange={() => toggleDevice(device.name)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{device.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {url && isValidUrl && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices
              .filter((device) => selectedDevices.includes(device.name))
              .map((device) => (
                <DevicePreview
                  key={device.name}
                  url={url}
                  name={device.name}
                  width={device.width}
                  height={device.height}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 
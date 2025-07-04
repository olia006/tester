import { useState } from 'react';
import DevicePreview from './components/DevicePreview';
import './App.css';

const devices = [
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

function App() {
  const [url, setUrl] = useState('');

  return (
    <div className="app">
      <h1>Responsive Tester</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter website URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="previews">
        {url &&
          devices.map((device) => (
            <DevicePreview
              key={device.name}
              url={url}
              name={device.name}
              width={device.width}
              height={device.height}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

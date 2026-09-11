import React from 'react';

export default function ContentStudioPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Studio</h1>
        <p className="text-gray-600">Draft, refine, and approve content using the LoopAgent and Company Brain.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Brief Generator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Topic / Trend</label>
              <input type="text" className="w-full border rounded p-2" placeholder="e.g. Sleep & Recovery" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select className="w-full border rounded p-2">
                <option>15-30s Video Script</option>
                <option>LinkedIn Carousel</option>
                <option>Text Post</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
              Generate Brief
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Draft</h2>
          <div className="bg-gray-50 border rounded p-4 h-64 overflow-y-auto mb-4 text-sm text-gray-700">
            No draft generated yet. Fill out the brief generator to start the Creator ↔ Critic loop.
          </div>
          <div className="flex gap-4">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded font-medium hover:bg-gray-50 flex-1">
              Human Edit
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 flex-1">
              Approve & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

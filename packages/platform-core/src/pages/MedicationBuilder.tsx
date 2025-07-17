import { useState } from 'react';

export default function MedicationBuilder() {
  const [signatureResult, setSignatureResult] = useState<string>('');

  const generateSignature = () => {
    setSignatureResult('Take 1 tablet by mouth twice daily with food');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Medication Builder</h1>
        <p className="text-gray-400">Create standardized medication signatures with FHIR compliance</p>
      </div>

      {/* Medication Selection */}
      <div className="bg-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Select Medication</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Medication Name
              </label>
              <select className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500">
                <option value="">Select a medication...</option>
                <option value="metformin">Metformin 500mg Tablet</option>
                <option value="lisinopril">Lisinopril 10mg Tablet</option>
                <option value="atorvastatin">Atorvastatin 20mg Tablet</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dose Form
              </label>
              <input 
                value="Tablet" 
                readOnly 
                placeholder="Will populate when medication selected"
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-600 rounded-lg">
            <h4 className="font-medium text-white mb-2">Selected Medication Details:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-300">Name:</span>
                <span className="text-white ml-2">Metformin 500mg</span>
              </div>
              <div>
                <span className="text-gray-300">Form:</span>
                <span className="text-white ml-2">Tablet</span>
              </div>
              <div>
                <span className="text-gray-300">Strength:</span>
                <span className="text-white ml-2">500mg</span>
              </div>
              <div>
                <span className="text-gray-300">Package:</span>
                <span className="text-white ml-2">30 tablets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Configuration */}
      <div className="bg-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Signature Configuration</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dose Amount
              </label>
              <input 
                type="number" 
                defaultValue="1"
                step="0.5"
                min="0.5"
                max="2"
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frequency
              </label>
              <select className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500">
                <option value="1">Once daily</option>
                <option value="2">Twice daily</option>
                <option value="3">Three times daily</option>
                <option value="4">Four times daily</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Route
              </label>
              <select className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500">
                <option value="by mouth">By mouth</option>
                <option value="sublingual">Sublingual</option>
                <option value="topical">Topical</option>
                <option value="intramuscular">Intramuscular</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Special Instructions
            </label>
            <input 
              placeholder="e.g., with food, on empty stomach, etc."
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500"
            />
          </div>

          <button 
            onClick={generateSignature}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Generate Signature
          </button>
        </div>
      </div>

      {/* Generated Signature */}
      {signatureResult && (
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Generated Signature</h2>
          <div className="p-4 bg-gray-600 rounded-lg">
            <p className="text-lg font-medium text-white">{signatureResult}</p>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              Copy to Clipboard
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Add to Prescription
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
              Save Template
            </button>
          </div>
        </div>
      )}

      {/* Builder Features Demo */}
      <div className="bg-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Advanced Builder Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white mb-2">Available Builder Types:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Simple Tablet/Liquid Builders</li>
              <li>• Complex PRN Dosing</li>
              <li>• Multi-Ingredient Compounds</li>
              <li>• Tapering Schedules</li>
              <li>• Fractional Dosing</li>
              <li>• Special Dispensers (Topiclick)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-2">Features:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• FHIR R4 Compliance</li>
              <li>• 500+ Test Cases</li>
              <li>• Sub-20ms Performance</li>
              <li>• Unit Conversion</li>
              <li>• Days Supply Calculation</li>
              <li>• Audit Trail</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> This is a simplified demo. The full medication builder package 
            includes advanced features like FHIR compliance, complex dosing scenarios, and 
            comprehensive validation. Integration pending TypeScript fixes.
          </p>
        </div>
      </div>
    </div>
  );
}
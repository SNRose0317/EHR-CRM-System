import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Input } from '@marek/ui-kit';
import { createBuilder, type MedicationProfile } from '@marek/medication-builder';

export default function MedicationBuilder() {
  const [selectedMedication, setSelectedMedication] = useState<MedicationProfile | null>(null);
  const [signatureResult, setSignatureResult] = useState<string>('');

  // Sample medication for demonstration
  const sampleMedication: MedicationProfile = {
    id: 'med-demo-001',
    name: 'Metformin 500mg',
    type: 'medication',
    doseForm: 'Tablet',
    isActive: true,
    code: {
      coding: [{
        system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
        code: '860975',
        display: 'Metformin 500 MG Oral Tablet'
      }]
    },
    ingredient: [{
      name: 'Metformin',
      strengthRatio: {
        numerator: { value: 500, unit: 'mg' },
        denominator: { value: 1, unit: 'tablet' }
      }
    }],
    packageInfo: {
      quantity: 1,
      unit: 'tablet',
      packSize: 30
    },
    totalVolume: { value: 1, unit: 'tablet' },
    dosageConstraints: {
      minDose: { value: 0.5, unit: 'tablet' },
      maxDose: { value: 2, unit: 'tablet' },
      stepSize: { value: 0.5, unit: 'tablet' }
    }
  };

  const generateSignature = () => {
    if (!selectedMedication) return;

    try {
      const builder = createBuilder(selectedMedication);
      
      const instructions = builder
        .buildDose({ value: 1, unit: 'tablet' })
        .buildTiming({ frequency: 2, period: 1, periodUnit: 'd' })
        .buildRoute('by mouth')
        .buildSpecialInstructions(['with food'])
        .getResult();

      setSignatureResult(instructions[0]?.text || 'No signature generated');
    } catch (error) {
      setSignatureResult('Error generating signature: ' + (error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Medication Builder</h1>
        <p className="text-gray-400">Create standardized medication signatures with FHIR compliance</p>
      </div>

      {/* Medication Selection */}
      <Card className="bg-gray-750">
        <CardHeader>
          <CardTitle>Select Medication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Medication Name
              </label>
              <Select onValueChange={() => setSelectedMedication(sampleMedication)}>
                <option value="">Select a medication...</option>
                <option value="metformin">Metformin 500mg Tablet</option>
                <option value="lisinopril">Lisinopril 10mg Tablet</option>
                <option value="atorvastatin">Atorvastatin 20mg Tablet</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dose Form
              </label>
              <Input 
                value={selectedMedication?.doseForm || ''} 
                readOnly 
                placeholder="Will populate when medication selected"
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>

          {selectedMedication && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Selected Medication Details:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white ml-2">{selectedMedication.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Form:</span>
                  <span className="text-white ml-2">{selectedMedication.doseForm}</span>
                </div>
                <div>
                  <span className="text-gray-400">Strength:</span>
                  <span className="text-white ml-2">
                    {selectedMedication.ingredient?.[0]?.strengthRatio.numerator.value}
                    {selectedMedication.ingredient?.[0]?.strengthRatio.numerator.unit}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Package:</span>
                  <span className="text-white ml-2">
                    {selectedMedication.packageInfo?.packSize} {selectedMedication.packageInfo?.unit}s
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Signature Configuration */}
      <Card className="bg-gray-750">
        <CardHeader>
          <CardTitle>Signature Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dose Amount
              </label>
              <Input 
                type="number" 
                defaultValue="1"
                step="0.5"
                min="0.5"
                max="2"
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frequency
              </label>
              <Select>
                <option value="1">Once daily</option>
                <option value="2">Twice daily</option>
                <option value="3">Three times daily</option>
                <option value="4">Four times daily</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Route
              </label>
              <Select>
                <option value="by mouth">By mouth</option>
                <option value="sublingual">Sublingual</option>
                <option value="topical">Topical</option>
                <option value="intramuscular">Intramuscular</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Special Instructions
            </label>
            <Input 
              placeholder="e.g., with food, on empty stomach, etc."
              className="bg-gray-700 border-gray-600"
            />
          </div>

          <Button 
            onClick={generateSignature}
            disabled={!selectedMedication}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Generate Signature
          </Button>
        </CardContent>
      </Card>

      {/* Generated Signature */}
      {signatureResult && (
        <Card className="bg-gray-750">
          <CardHeader>
            <CardTitle>Generated Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-white">{signatureResult}</p>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button variant="outline">Copy to Clipboard</Button>
              <Button variant="outline">Add to Prescription</Button>
              <Button variant="outline">Save Template</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Builder Features Demo */}
      <Card className="bg-gray-750">
        <CardHeader>
          <CardTitle>Advanced Builder Features</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
/**
 * Titration Days Supply Strategy
 *
 * Handles multi-phase dosing schedules where dose amounts change
 * over time (e.g., GLP-1 agonist dose escalation protocols).
 *
 * @since 3.1.0
 */
import { DaysSupplyContext } from '../../temporal/types';
import { SpecificityLevel } from '../types';
import { IDaysSupplyStrategy, DaysSupplyResult } from './types';
export declare class TitrationDaysSupplyStrategy implements IDaysSupplyStrategy {
    readonly specificity = SpecificityLevel.DOSE_FORM_AND_INGREDIENT;
    readonly id = "titration-days-supply";
    readonly name = "Titration Days Supply Calculator";
    private readonly temporalParser;
    /**
     * Determines if this strategy matches the given context
     */
    matches(context: DaysSupplyContext): boolean;
    /**
     * Calculates days supply for titration schedule
     */
    calculate(context: DaysSupplyContext): DaysSupplyResult;
    /**
     * Parse titration phases from context
     */
    private parseTitrationPhases;
    /**
     * Convert FHIR timings to titration phases
     */
    private convertFHIRTimingsToPhases;
    /**
     * Calculate total days supply for titration schedule
     */
    private calculateTitrationDaysSupply;
    /**
     * Calculate supply for a single phase
     */
    private calculatePhaseSupply;
    /**
     * Get effective dose amount for a phase (may vary by phase)
     */
    private getEffectiveDoseAmount;
    /**
     * Calculate phase duration in days
     */
    private calculatePhaseDurationInDays;
    /**
     * Get maintenance phase information
     */
    private getMaintenancePhaseInfo;
    /**
     * Explains the strategy's behavior
     */
    explain(): string;
}
/**
 * Example usage and test cases for titration calculation
 */
export declare const TITRATION_EXAMPLES: {
    readonly GLP1_AGONIST: {
        readonly description: "GLP-1 agonist dose escalation (Ozempic/Wegovy pattern)";
        readonly phases: readonly ["Week 1-4: Inject 12.5 units once weekly", "Week 5-8: Inject 25 units once weekly", "Week 9+: Inject 50 units once weekly"];
        readonly expectedCalculation: {
            readonly week1to4: {
                readonly doses: 4;
                readonly unitsPerDose: 12.5;
                readonly totalUnits: 50;
            };
            readonly week5to8: {
                readonly doses: 4;
                readonly unitsPerDose: 25;
                readonly totalUnits: 100;
            };
            readonly titrationTotal: 150;
            readonly maintenanceUnitsPerWeek: 50;
        };
    };
    readonly INSULIN_TITRATION: {
        readonly description: "Insulin dose titration protocol";
        readonly phases: readonly ["Week 1-2: Inject 10 units once daily", "Week 3-4: Inject 15 units once daily", "Week 5+: Inject 20 units once daily"];
        readonly expectedCalculation: {
            readonly week1to2: {
                readonly doses: 14;
                readonly unitsPerDose: 10;
                readonly totalUnits: 140;
            };
            readonly week3to4: {
                readonly doses: 14;
                readonly unitsPerDose: 15;
                readonly totalUnits: 210;
            };
            readonly titrationTotal: 350;
            readonly maintenanceUnitsPerDay: 20;
        };
    };
};
//# sourceMappingURL=TitrationDaysSupplyStrategy.d.ts.map
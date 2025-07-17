/**
 * Immutable Value Objects for Medication Signature Builder
 *
 * Provides type-safe, immutable value objects for doses, frequencies, and routes.
 * Uses branded types to prevent mixing incompatible units at compile time.
 *
 * @since 2.0.0
 */
/**
 * Branded type for mass measurements (solid medications)
 */
export type Mass = {
    readonly _brand: 'Mass';
    readonly value: number;
    readonly unit: MassUnit;
};
/**
 * Branded type for volume measurements (liquid medications)
 */
export type Volume = {
    readonly _brand: 'Volume';
    readonly value: number;
    readonly unit: VolumeUnit;
};
/**
 * Branded type for count measurements (discrete units)
 */
export type Count = {
    readonly _brand: 'Count';
    readonly value: number;
    readonly unit: CountUnit;
};
/**
 * Valid mass units
 */
export type MassUnit = 'mcg' | 'mg' | 'g' | 'kg';
/**
 * Valid volume units
 */
export type VolumeUnit = 'mL' | 'L';
/**
 * Valid count units
 */
export type CountUnit = 'tablet' | 'capsule' | 'patch' | 'suppository' | 'click' | 'puff' | 'drop';
/**
 * All mass units as const array
 */
export declare const MASS_UNITS: readonly MassUnit[];
/**
 * All volume units as const array
 */
export declare const VOLUME_UNITS: readonly VolumeUnit[];
/**
 * All count units as const array
 */
export declare const COUNT_UNITS: readonly CountUnit[];
/**
 * Factory function for creating Mass values
 */
export declare function mass(value: number, unit: MassUnit): Mass;
/**
 * Factory function for creating Volume values
 */
export declare function volume(value: number, unit: VolumeUnit): Volume;
/**
 * Factory function for creating Count values
 */
export declare function count(value: number, unit: CountUnit): Count;
/**
 * Type guard for Mass
 */
export declare function isMass(value: any): value is Mass;
/**
 * Type guard for Volume
 */
export declare function isVolume(value: any): value is Volume;
/**
 * Type guard for Count
 */
export declare function isCount(value: any): value is Count;
/**
 * JSON representation of a Dose
 */
export type DoseJSON = {
    type: 'mass';
    value: number;
    unit: MassUnit;
} | {
    type: 'volume';
    value: number;
    unit: VolumeUnit;
} | {
    type: 'count';
    value: number;
    unit: CountUnit;
};
/**
 * Immutable Dose value object
 *
 * Encapsulates a medication dose with type-safe units.
 * Prevents mixing mass/volume/count at compile and runtime.
 */
export declare class Dose {
    private readonly branded;
    private constructor();
    /**
     * Create a dose from mass measurement
     */
    static fromMass(value: number, unit: MassUnit): Dose;
    /**
     * Create a dose from volume measurement
     */
    static fromVolume(value: number, unit: VolumeUnit): Dose;
    /**
     * Create a dose from count measurement
     */
    static fromCount(value: number, unit: CountUnit): Dose;
    /**
     * Create a dose from a branded type
     */
    static fromBranded(branded: Mass | Volume | Count): Dose;
    /**
     * Get the numeric value
     */
    getValue(): number;
    /**
     * Get the unit as a string
     */
    getUnit(): string;
    /**
     * Check if this is a mass dose
     */
    isMass(): boolean;
    /**
     * Check if this is a volume dose
     */
    isVolume(): boolean;
    /**
     * Check if this is a count dose
     */
    isCount(): boolean;
    /**
     * Get the underlying branded type
     */
    getBranded(): Mass | Volume | Count;
    /**
     * Check equality with another dose
     */
    equals(other: Dose): boolean;
    /**
     * Serialize to JSON
     */
    toJSON(): DoseJSON;
    /**
     * Deserialize from JSON
     */
    static fromJSON(json: DoseJSON): Dose;
}
/**
 * Type guard for Dose
 */
export declare function isDose(value: any): value is Dose;
/**
 * Period units for frequency
 */
export type PeriodUnit = 'hour' | 'day' | 'week' | 'month';
/**
 * When to take medication
 */
export type WhenTiming = 'morning' | 'noon' | 'evening' | 'bedtime';
/**
 * Regular frequency data
 */
interface RegularFrequency {
    type: 'regular';
    times: number;
    period: number;
    periodUnit: PeriodUnit;
    when?: WhenTiming[];
}
/**
 * PRN (as needed) frequency data
 */
interface PRNFrequency {
    type: 'prn';
    minInterval: number;
    intervalUnit: PeriodUnit;
    indication?: string;
    maxPerDay?: number;
}
/**
 * JSON representation of Frequency
 */
export type FrequencyJSON = RegularFrequency | PRNFrequency;
/**
 * Immutable Frequency value object
 *
 * Represents how often a medication should be taken.
 * Supports both regular schedules and PRN (as needed).
 */
export declare class Frequency {
    private readonly data;
    private constructor();
    /**
     * Create a regular frequency
     */
    static create(params: {
        times: number;
        period: number;
        periodUnit: PeriodUnit;
        when?: WhenTiming[];
    }): Frequency;
    /**
     * Create a PRN (as needed) frequency
     */
    static createPRN(params: {
        minInterval: number;
        intervalUnit: PeriodUnit;
        indication?: string;
        maxPerDay?: number;
    }): Frequency;
    static daily(): Frequency;
    static twiceDaily(): Frequency;
    static threeTimesDaily(): Frequency;
    static fourTimesDaily(): Frequency;
    static everyXHours(hours: number): Frequency;
    /**
     * Check if this is a PRN frequency
     */
    isPRN(): boolean;
    /**
     * Get times per period (for regular frequencies)
     */
    getTimes(): number;
    /**
     * Get period value
     */
    getPeriod(): number;
    /**
     * Get period unit
     */
    getPeriodUnit(): PeriodUnit;
    /**
     * Get when timings
     */
    getWhen(): WhenTiming[] | undefined;
    /**
     * Get minimum interval (for PRN)
     */
    getMinInterval(): number;
    /**
     * Get indication (for PRN)
     */
    getIndication(): string | undefined;
    /**
     * Check equality
     */
    equals(other: Frequency): boolean;
    /**
     * Serialize to JSON
     */
    toJSON(): FrequencyJSON;
    /**
     * Deserialize from JSON
     */
    static fromJSON(json: FrequencyJSON): Frequency;
}
/**
 * Type guard for Frequency
 */
export declare function isFrequency(value: any): value is Frequency;
/**
 * Route verbs based on administration method
 */
export declare const ROUTE_VERBS: {
    readonly Take: readonly ["by mouth", "orally", "with water", "with food"];
    readonly Apply: readonly ["topically", "to skin", "to affected area", "externally"];
    readonly Inject: readonly ["subcutaneously", "intramuscularly", "subcutaneous", "intramuscular"];
    readonly Infuse: readonly ["intravenously", "via IV", "IV"];
    readonly Place: readonly ["sublingually", "under tongue", "buccally", "in cheek"];
    readonly Insert: readonly ["rectally", "vaginally", "per rectum"];
    readonly Inhale: readonly ["by inhalation", "inhaled", "via nebulizer"];
    readonly Instill: readonly ["in eye", "in ear", "ophthalmic", "otic"];
};
/**
 * JSON representation of Route
 */
export interface RouteJSON {
    value: string;
    verb: string;
}
/**
 * Immutable Route value object
 *
 * Represents how a medication is administered,
 * including the appropriate verb for instructions.
 */
export declare class Route {
    private readonly value;
    private readonly verb;
    private constructor();
    /**
     * Create a route with automatic verb determination
     */
    static create(route: string): Route;
    /**
     * Determine the appropriate verb for a route
     */
    private static determineVerb;
    static oral(): Route;
    static sublingual(): Route;
    static topical(): Route;
    static subcutaneous(): Route;
    static intramuscular(): Route;
    static intravenous(): Route;
    static rectal(): Route;
    static inhaled(): Route;
    /**
     * Get the route value
     */
    getValue(): string;
    /**
     * Get the verb for this route
     */
    getVerb(): string;
    /**
     * Check equality
     */
    equals(other: Route): boolean;
    /**
     * Serialize to JSON
     */
    toJSON(): RouteJSON;
    /**
     * Deserialize from JSON
     */
    static fromJSON(json: RouteJSON): Route;
}
/**
 * Type guard for Route
 */
export declare function isRoute(value: any): value is Route;
export {};
//# sourceMappingURL=value-objects.d.ts.map
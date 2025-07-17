/**
 * Immutable Value Objects for Medication Signature Builder
 *
 * Provides type-safe, immutable value objects for doses, frequencies, and routes.
 * Uses branded types to prevent mixing incompatible units at compile time.
 *
 * @since 2.0.0
 */
/**
 * All mass units as const array
 */
export const MASS_UNITS = ['mcg', 'mg', 'g', 'kg'];
/**
 * All volume units as const array
 */
export const VOLUME_UNITS = ['mL', 'L'];
/**
 * All count units as const array
 */
export const COUNT_UNITS = ['tablet', 'capsule', 'patch', 'suppository', 'click', 'puff', 'drop'];
/**
 * Factory function for creating Mass values
 */
export function mass(value, unit) {
    if (value <= 0) {
        throw new Error('Mass value must be positive');
    }
    if (!MASS_UNITS.includes(unit)) {
        throw new Error(`Invalid mass unit: ${unit}`);
    }
    return { _brand: 'Mass', value, unit };
}
/**
 * Factory function for creating Volume values
 */
export function volume(value, unit) {
    if (value <= 0) {
        throw new Error('Volume value must be positive');
    }
    if (!VOLUME_UNITS.includes(unit)) {
        throw new Error(`Invalid volume unit: ${unit}`);
    }
    return { _brand: 'Volume', value, unit };
}
/**
 * Factory function for creating Count values
 */
export function count(value, unit) {
    if (value <= 0) {
        throw new Error('Count value must be positive');
    }
    if (!COUNT_UNITS.includes(unit)) {
        throw new Error(`Invalid count unit: ${unit}`);
    }
    return { _brand: 'Count', value, unit };
}
/**
 * Type guard for Mass
 */
export function isMass(value) {
    return value !== null && typeof value === 'object' && value._brand === 'Mass';
}
/**
 * Type guard for Volume
 */
export function isVolume(value) {
    return value !== null && typeof value === 'object' && value._brand === 'Volume';
}
/**
 * Type guard for Count
 */
export function isCount(value) {
    return value !== null && typeof value === 'object' && value._brand === 'Count';
}
/**
 * Immutable Dose value object
 *
 * Encapsulates a medication dose with type-safe units.
 * Prevents mixing mass/volume/count at compile and runtime.
 */
export class Dose {
    constructor(branded) {
        this.branded = branded;
    }
    /**
     * Create a dose from mass measurement
     */
    static fromMass(value, unit) {
        return new Dose(mass(value, unit));
    }
    /**
     * Create a dose from volume measurement
     */
    static fromVolume(value, unit) {
        return new Dose(volume(value, unit));
    }
    /**
     * Create a dose from count measurement
     */
    static fromCount(value, unit) {
        return new Dose(count(value, unit));
    }
    /**
     * Create a dose from a branded type
     */
    static fromBranded(branded) {
        return new Dose(branded);
    }
    /**
     * Get the numeric value
     */
    getValue() {
        return this.branded.value;
    }
    /**
     * Get the unit as a string
     */
    getUnit() {
        return this.branded.unit;
    }
    /**
     * Check if this is a mass dose
     */
    isMass() {
        return isMass(this.branded);
    }
    /**
     * Check if this is a volume dose
     */
    isVolume() {
        return isVolume(this.branded);
    }
    /**
     * Check if this is a count dose
     */
    isCount() {
        return isCount(this.branded);
    }
    /**
     * Get the underlying branded type
     */
    getBranded() {
        return this.branded;
    }
    /**
     * Check equality with another dose
     */
    equals(other) {
        // Must be same type
        if (this.branded._brand !== other.branded._brand) {
            throw new Error('Cannot compare different dose types');
        }
        return this.branded.value === other.branded.value &&
            this.branded.unit === other.branded.unit;
    }
    /**
     * Serialize to JSON
     */
    toJSON() {
        if (isMass(this.branded)) {
            return { type: 'mass', value: this.branded.value, unit: this.branded.unit };
        }
        else if (isVolume(this.branded)) {
            return { type: 'volume', value: this.branded.value, unit: this.branded.unit };
        }
        else {
            return { type: 'count', value: this.branded.value, unit: this.branded.unit };
        }
    }
    /**
     * Deserialize from JSON
     */
    static fromJSON(json) {
        switch (json.type) {
            case 'mass':
                return Dose.fromMass(json.value, json.unit);
            case 'volume':
                return Dose.fromVolume(json.value, json.unit);
            case 'count':
                return Dose.fromCount(json.value, json.unit);
            default:
                throw new Error(`Unknown dose type: ${json.type}`);
        }
    }
}
/**
 * Type guard for Dose
 */
export function isDose(value) {
    return value instanceof Dose;
}
/**
 * Immutable Frequency value object
 *
 * Represents how often a medication should be taken.
 * Supports both regular schedules and PRN (as needed).
 */
export class Frequency {
    constructor(data) {
        this.data = data;
    }
    /**
     * Create a regular frequency
     */
    static create(params) {
        if (params.times <= 0) {
            throw new Error('Times must be positive');
        }
        if (params.period <= 0) {
            throw new Error('Period must be positive');
        }
        if (!['hour', 'day', 'week', 'month'].includes(params.periodUnit)) {
            throw new Error(`Invalid period unit: ${params.periodUnit}`);
        }
        return new Frequency({
            type: 'regular',
            times: params.times,
            period: params.period,
            periodUnit: params.periodUnit,
            when: params.when
        });
    }
    /**
     * Create a PRN (as needed) frequency
     */
    static createPRN(params) {
        if (params.minInterval <= 0) {
            throw new Error('Minimum interval must be positive');
        }
        if (!['hour', 'day', 'week', 'month'].includes(params.intervalUnit)) {
            throw new Error(`Invalid interval unit: ${params.intervalUnit}`);
        }
        return new Frequency({
            type: 'prn',
            minInterval: params.minInterval,
            intervalUnit: params.intervalUnit,
            indication: params.indication,
            maxPerDay: params.maxPerDay
        });
    }
    // Common frequency patterns
    static daily() {
        return Frequency.create({ times: 1, period: 1, periodUnit: 'day' });
    }
    static twiceDaily() {
        return Frequency.create({ times: 2, period: 1, periodUnit: 'day' });
    }
    static threeTimesDaily() {
        return Frequency.create({ times: 3, period: 1, periodUnit: 'day' });
    }
    static fourTimesDaily() {
        return Frequency.create({ times: 4, period: 1, periodUnit: 'day' });
    }
    static everyXHours(hours) {
        return Frequency.create({ times: 1, period: hours, periodUnit: 'hour' });
    }
    /**
     * Check if this is a PRN frequency
     */
    isPRN() {
        return this.data.type === 'prn';
    }
    /**
     * Get times per period (for regular frequencies)
     */
    getTimes() {
        if (this.data.type === 'regular') {
            return this.data.times;
        }
        throw new Error('Times not available for PRN frequency');
    }
    /**
     * Get period value
     */
    getPeriod() {
        if (this.data.type === 'regular') {
            return this.data.period;
        }
        throw new Error('Period not available for PRN frequency');
    }
    /**
     * Get period unit
     */
    getPeriodUnit() {
        if (this.data.type === 'regular') {
            return this.data.periodUnit;
        }
        return this.data.intervalUnit;
    }
    /**
     * Get when timings
     */
    getWhen() {
        if (this.data.type === 'regular') {
            return this.data.when;
        }
        return undefined;
    }
    /**
     * Get minimum interval (for PRN)
     */
    getMinInterval() {
        if (this.data.type === 'prn') {
            return this.data.minInterval;
        }
        throw new Error('Min interval not available for regular frequency');
    }
    /**
     * Get indication (for PRN)
     */
    getIndication() {
        if (this.data.type === 'prn') {
            return this.data.indication;
        }
        return undefined;
    }
    /**
     * Check equality
     */
    equals(other) {
        if (this.data.type !== other.data.type) {
            return false;
        }
        if (this.data.type === 'regular' && other.data.type === 'regular') {
            return this.data.times === other.data.times &&
                this.data.period === other.data.period &&
                this.data.periodUnit === other.data.periodUnit &&
                JSON.stringify(this.data.when) === JSON.stringify(other.data.when);
        }
        if (this.data.type === 'prn' && other.data.type === 'prn') {
            return this.data.minInterval === other.data.minInterval &&
                this.data.intervalUnit === other.data.intervalUnit &&
                this.data.indication === other.data.indication &&
                this.data.maxPerDay === other.data.maxPerDay;
        }
        return false;
    }
    /**
     * Serialize to JSON
     */
    toJSON() {
        return { ...this.data };
    }
    /**
     * Deserialize from JSON
     */
    static fromJSON(json) {
        if (json.type === 'regular') {
            return Frequency.create({
                times: json.times,
                period: json.period,
                periodUnit: json.periodUnit,
                when: json.when
            });
        }
        else {
            return Frequency.createPRN({
                minInterval: json.minInterval,
                intervalUnit: json.intervalUnit,
                indication: json.indication,
                maxPerDay: json.maxPerDay
            });
        }
    }
}
/**
 * Type guard for Frequency
 */
export function isFrequency(value) {
    return value instanceof Frequency;
}
// ===== Route Value Object =====
/**
 * Route verbs based on administration method
 */
export const ROUTE_VERBS = {
    Take: ['by mouth', 'orally', 'with water', 'with food'],
    Apply: ['topically', 'to skin', 'to affected area', 'externally'],
    Inject: ['subcutaneously', 'intramuscularly', 'subcutaneous', 'intramuscular'],
    Infuse: ['intravenously', 'via IV', 'IV'],
    Place: ['sublingually', 'under tongue', 'buccally', 'in cheek'],
    Insert: ['rectally', 'vaginally', 'per rectum'],
    Inhale: ['by inhalation', 'inhaled', 'via nebulizer'],
    Instill: ['in eye', 'in ear', 'ophthalmic', 'otic']
};
/**
 * Immutable Route value object
 *
 * Represents how a medication is administered,
 * including the appropriate verb for instructions.
 */
export class Route {
    constructor(value, verb) {
        this.value = value;
        this.verb = verb;
    }
    /**
     * Create a route with automatic verb determination
     */
    static create(route) {
        const trimmed = route.trim();
        if (!trimmed) {
            throw new Error('Route cannot be empty');
        }
        const verb = Route.determineVerb(trimmed);
        return new Route(trimmed, verb);
    }
    /**
     * Determine the appropriate verb for a route
     */
    static determineVerb(route) {
        const lowerRoute = route.toLowerCase();
        for (const [verb, patterns] of Object.entries(ROUTE_VERBS)) {
            if (patterns.some(pattern => lowerRoute.includes(pattern))) {
                return verb;
            }
        }
        // Default verb for unknown routes
        return 'Administer';
    }
    // Common route factories
    static oral() {
        return Route.create('by mouth');
    }
    static sublingual() {
        return Route.create('sublingually');
    }
    static topical() {
        return Route.create('topically');
    }
    static subcutaneous() {
        return Route.create('subcutaneously');
    }
    static intramuscular() {
        return Route.create('intramuscularly');
    }
    static intravenous() {
        return Route.create('intravenously');
    }
    static rectal() {
        return Route.create('rectally');
    }
    static inhaled() {
        return Route.create('by inhalation');
    }
    /**
     * Get the route value
     */
    getValue() {
        return this.value;
    }
    /**
     * Get the verb for this route
     */
    getVerb() {
        return this.verb;
    }
    /**
     * Check equality
     */
    equals(other) {
        return this.value === other.value && this.verb === other.verb;
    }
    /**
     * Serialize to JSON
     */
    toJSON() {
        return {
            value: this.value,
            verb: this.verb
        };
    }
    /**
     * Deserialize from JSON
     */
    static fromJSON(json) {
        return new Route(json.value, json.verb);
    }
}
/**
 * Type guard for Route
 */
export function isRoute(value) {
    return value instanceof Route;
}
//# sourceMappingURL=value-objects.js.map
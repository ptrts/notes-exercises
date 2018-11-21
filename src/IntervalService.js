import validate from './validate';

export class Interval {

    constructor(halfTones, name, shortName) {
        this.halfTones = halfTones;
        this.name = name;
        if (shortName) {
            this.shortName = shortName;
        } else {
            this.shortName = name;
        }
    }
}

export const basicSequence = [
    new Interval(0, 'унисон'),
    new Interval(1, 'малая секунда', 'м секунда'),
    new Interval(2, 'большая секунда', 'б секунда'),
    new Interval(3, 'малая терция', 'м терция'),
    new Interval(4, 'большая терция', 'б терция'),
    new Interval(5, 'кварта'),
    new Interval(6, 'уменьшенная квинта', 'ум квинта'),
    new Interval(7, 'квинта'),
    new Interval(8, 'малая секста', 'м секста'),
    new Interval(9, 'большая секста', 'б секста'),
    new Interval(10, 'малая септима', 'м септима'),
    new Interval(11, 'большая септима', 'б септима'),
    new Interval(12, 'октава'),
];

function _validateMinMax(min, max) {
    validate(min >= 0, 'min argument should be greater than zero');
    validate(min < 24, 'min argument should be less than 24');
    validate(max >= 0, 'max argument should be greater than zero');
    validate(max < 24, 'max argument should be less than 24');
    validate(min <= max, 'min should be less or equal to max');
}

function _generateBigSequence(min, max) {

    _validateMinMax(min, max);

    const result = [];

    for (let i = min; i <= max; i++) {
        let interval;
        if (i <= 12) {
            interval = basicSequence[i];
        } else {
            const smallInterval = basicSequence[i - 12];
            interval = new Interval(i, 'октава + ' + smallInterval.name, 'октава + ' + smallInterval.shortName);
        }
        result.push(interval);
    }

    return result;
}

export const sequence = _generateBigSequence(0, 23);

export function subsequence(min, max) {
    _validateMinMax(min, max);
    return sequence.slice(min, max + 1);
}

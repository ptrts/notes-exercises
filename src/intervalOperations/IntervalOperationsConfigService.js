import store2 from "store2";
import IntervalOperationsConfig2 from './IntervalOperationsConfig';

const _DEFAULT_INTERVAL_OPERATIONS_CONFIG = new IntervalOperationsConfig2({
    min1: 1,
    max1: 12,
    min2: 1,
    max2: 12,
    allowPlus: true,
    allowMinus: true,
});

const _STORE = store2.local.namespace('intervalOperations');

export function load() {
    return _STORE.getAll(_DEFAULT_INTERVAL_OPERATIONS_CONFIG);
}

export function store(config) {
    _STORE.setAll(config);
}

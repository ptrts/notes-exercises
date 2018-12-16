import store2 from "store2";
import ScoreConfig from './ScoreConfig';

const _DEFAULT_SCORE_CONFIG = new ScoreConfig({
    min: 1,
    max: 12,
});

const _STORE = store2.local.namespace('score');

export function load() {
    return _STORE.getAll(_DEFAULT_SCORE_CONFIG);
}

export function store(config) {
    _STORE.setAll(config);
}

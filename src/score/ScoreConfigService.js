import store2 from "store2";
import ScoreConfig from './ScoreConfig';

const _DEFAULT_SCORE_CONFIG = new ScoreConfig({
    allowTreble: true,
    allowBass: false,
    keyboard: true,
    trebleMinNote: 'c/4',
    trebleMaxNote: 'c/4',
    bassMinNote: 'c/4',
    bassMaxNote: 'c/4',
});

const _STORE = store2.local.namespace('score');

export function load() {
    return _STORE.getAll(_DEFAULT_SCORE_CONFIG);
}

export function store(config) {
    _STORE.setAll(config);
}

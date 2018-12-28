import Vex from 'vexflow'

export function getSvgInnerHtml(clef, note, duration) {

    const VF = Vex.Flow;

    // Делаем дивчик
    const div = document.createElement('div');

    // Создаем рендерер в этот самый наш див
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    const width = 95;
    const height = 120;

    // Настраиваем наш рендерер, чтоб он в этом диве сделал ноты размером 500 * 500
    renderer.resize(width, height);

    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    // Добавляем ноты на канвас
    const left = 0;
    const top = 0;
    const stave = new VF.Stave(left, top, width);

    // Add a clef
    stave.addClef(clef);

    // Add time signature.
    //.addTimeSignature('4/4')

    const notes = [
        new VF.StaveNote({clef: clef, keys: [note], duration: duration }),
    ];

    // Create a voice in 1/4 and add above notes
    const voice = new VF.Voice({num_beats: 1,  beat_value: 4});
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter();

    formatter.joinVoices([voice]).format([voice], 100);

    // Render voice
    voice.draw(context, stave);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    return div.innerHTML;
}

const NOTES = 'cdefgab';

const NOTES_RU = [
    'до',
    'ре',
    'ми',
    'фа',
    'соль',
    'ля',
    'си',
];

export function parseNote(noteStr) {

    const REGEXP = /([abcdefg])\/([0-9])/g;

    const parts = REGEXP.exec(noteStr);
    let noteLetter = parts[1];
    let octaveNumberStr = parts[2];

    let noteIndex = NOTES.indexOf(noteLetter);

    let octaveNumber = Number(octaveNumberStr);

    return _fromOctaveNumberAndIndex(octaveNumber, noteIndex);
}

function _fromOctaveNumberAndIndex(octaveNumber, index) {
    const bigIndex = octaveNumber * 7 + index;
    const ru = NOTES_RU[index];
    const en = NOTES.charAt(index);
    const str = _getStr(octaveNumber, index);
    return {
        octaveNumber,
        index,
        bigIndex,
        str,
        ru,
        en,
    };
}

export function noteFromBigIndex(bigIndex) {
    const index = bigIndex % 7;
    const octaveNumber = Math.round((bigIndex - index) / 7);
    const ru = NOTES_RU[index];
    const en = NOTES.charAt(index);
    const str = _getStr(octaveNumber, index);
    return {
        octaveNumber,
        index,
        bigIndex,
        str,
        ru,
        en,
    };
}

function _addToNote(note, n) {
    return noteFromBigIndex(note.bigIndex + n);
}

function _getStr(octaveNumber, index) {
    const noteLetter = NOTES.charAt(index);
    return noteLetter + '/' + octaveNumber;
}

export function addToNoteStr(noteStr, n) {
    const note = parseNote(noteStr);
    const newNote = _addToNote(note, n);
    return newNote.str;
}

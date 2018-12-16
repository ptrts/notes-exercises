export default class ScoreConfig {

    constructor({allowTreble, allowBass, trebleMinNote, trebleMaxNote, bassMinNote, bassMaxNote}) {
        this.allowTreble = allowTreble;
        this.allowBass = allowBass;
        this.trebleMinNote = trebleMinNote;
        this.trebleMaxNote = trebleMaxNote;
        this.bassMinNote = bassMinNote;
        this.bassMaxNote = bassMaxNote;
    }
}

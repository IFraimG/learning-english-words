export class SpeechSythesis {
  public mainWord: string
  protected wordType: string
  protected voiceURI: string
  protected msg: any | null
  readonly volume: number

  constructor(public word: string, protected langType: string) {
    this.msg = null
    this.mainWord = word
    this.wordType = langType
    this.voiceURI = "native"
    this.volume = 1
  }

  public render() {
    if ("speechSynthesis" in window) {
      this.msg = new SpeechSynthesisUtterance(this.mainWord);
      this.msg.voiceURI = this.voiceURI
      this.msg.volume = this.volume
      this.msg.lang = this.wordType

      this.msg.voice = speechSynthesis.getVoices().forEach((voice) => true);
    }
  }

  public shooseSpeaker(speakerName: string) {
    this.msg.voice = speechSynthesis.getVoices().filter(voice => voice.name == speakerName)[0]
  }

  public speak() {
    speechSynthesis.speak(this.msg)
  }
}
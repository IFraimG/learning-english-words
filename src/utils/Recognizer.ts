class Recognizer {
  private recognition: any
  public isRecognizing: boolean
  public transcript: string

  private isMobile = (): boolean => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  constructor(window: any) {
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition()
    this.recognition.lang = "ru-RU"
    if (!this.isMobile()) {
      this.recognition.continuous = true
      this.recognition.interimResults = true
    }
    this.isRecognizing = false
    this.transcript = ""
  }

  public start(handler: (interim_transcript: string) => void): void {
    this.transcript = ""
    this.recognition.onresult = (event: any) => this.onResult(event, handler)

    this.recognition.start()
    this.isRecognizing = true
    console.log("Started recognition")
  }

  public stop() {
    this.recognition.abort()
    this.isRecognizing = false
    console.log("Stopped recognition")
  }

  private onResult(event: any, handler: (interim_transcript: string) => void): void {
    let interim_transcript = ""

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i]
      if (result.isFinal) this.transcript += result[0].transcript
      else interim_transcript += result[0].transcript
    }

    handler(interim_transcript)
  }
}

export default Recognizer

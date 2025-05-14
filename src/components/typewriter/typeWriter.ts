export default class TypeWritter {
    private memoWord: string
    private nextWord: string
    private word: string
    private index: number
    private eventQueue: string[]
    private dummyQueue: Array<string | undefined>
    private erasing: boolean

    constructor() {
        this.dummyQueue = []
        this.eventQueue = []
        // this.initTaskQueue()
    }

    public restartTypeWriter() {
        this.memoWord = this.nextWord
        if (this.nextWord){
            if (this.nextWord.startsWith(this.word)){
                this.eventQueue.length = 0
                const remainingItems = this.eventQueue = this.nextWord.substring(
                    this.word.length, this.nextWord.length
                ).split("")
                this.eventQueue.push(...remainingItems)
                // this.eventQueue = []
            } else {
                this.eventQueue = this.nextWord.split('')
            }
        } else {
            this.eventQueue = []
        }
        // this.eventQueue = this.nextWord ? (
        //     this.nextWord.startsWith(this.word) ?
        //         []:
        //         this.nextWord.split('')
        // ) : []
        this.erasing = false
        return this.word
    }

    /**
     * Main process function
     * typing
     *    |-- writing
     *    |-- erasing
     *    |-- restartWrite
     *
     * @returns
     * @memberof TypeWritter
     */
    public typing() {
        // console.log(this.word, this.nextWord)
        // erasing to last character, start write next word
        if (this.erasing && (
            !this.word ||
            this.nextWord.startsWith(this.word)
        )) {
            // console.log(this.erasing, this.word)
            console.log("restarting")
            return this.restartTypeWriter()
        }
        // erasing
        if (this.erasing && this.word) {
            return this.erase()
        }
        // write end
        if (this.word === this.memoWord) {
            return this.word
        }
        // writing
        const el = this.eventQueue.shift()
        this.dummyQueue.push(el)
        this.word = this.dummyQueue.join('')
        return this.word
    }

    public startTypeWord(str: string) {
        this.erasing = true
        this.nextWord = str
        this.dummyQueue.pop()
        this.word = this.dummyQueue.join('')
        return this.word
    }

    public erase() {
        this.dummyQueue.pop()
        this.word = this.dummyQueue.join('')
        return this.word
    }

    public rd(): number {
        const r = Math.random()
        return r > 0.1 || r < 0.07
            ? this.rd()
            : r * 500
    }

}
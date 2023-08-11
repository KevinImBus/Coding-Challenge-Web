class Message{
    sentAt: number;
    nickname: String;
    message: String;

    constructor(sentAt: number, nickname: String, message: String){
        this.sentAt = sentAt;
        this.nickname = nickname;
        this.message = message;
    }
}
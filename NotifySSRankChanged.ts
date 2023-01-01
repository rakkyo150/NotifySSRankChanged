const playerId:string = "76561199070578780";
const sSEndpoint:string = `https://scoresaber.com/api/player/${playerId}/basic`;

// 数字だけ扱うならnumberにしないと実態と離れてしまう
let nowRank:number = 0
let previousRank:number = 0

const iCloud: FileManager = FileManager.iCloud();
const document: string = iCloud.documentsDirectory();
const dataDirPath = iCloud.joinPath(document, "ScoreSaberRanking");
const dataPath = iCloud.joinPath(dataDirPath, "yourRanking.txt");

interface Player{
    rank : number;
    countryRank: number;
}

const response: Promise<Player> = GetNowData();

response.then((data:Player)=>{
    // nowRank = data.rank;
    nowRank = data.countryRank;
    console.log("Now Rank " + nowRank);
    if (!iCloud.fileExists(dataPath)) {
        InitializePreviousRank();
        Script.complete();
        return;
    }
    CompareAndNotify();
    UpdatePreviousRank();
    Script.complete();
}).catch((error)=>{
    console.error(error.message);
    NotifyError("Failed to get your data");
    Script.complete();
})

function GetNowData(): Promise<any> {
    const request: Request = new Request(sSEndpoint);
    const response: Promise<any> = request.loadJSON();
    return response;
}

function InitializePreviousRank(): void {
    if(!iCloud.isDirectory(dataDirPath)){
        iCloud.createDirectory(dataDirPath);
    }
    UpdatePreviousRank();
    NotifyInitializePreviousRank();
}

function CompareAndNotify(): void {
    const previousRankData: Promise<void> = iCloud.downloadFileFromiCloud(dataPath);
    previousRankData.then(()=>{
        if(Number.isNaN(Number(iCloud.readString(dataPath)))) return;

        previousRank = Number(iCloud.readString(dataPath));
        console.log("Previous Rank " + previousRank);

        if (previousRank != nowRank) {
            NotifyRankChange(previousRank, nowRank);
        }
    }).catch((error)=>{
        console.error(error);
        NotifyError("Failed to read previous rank data")
    });
}

function UpdatePreviousRank(): void{
    iCloud.writeString(dataPath, nowRank.toString());
}    

function NotifyInitializePreviousRank(): void{
    const notification = new Notification();
    notification.title = "First Run"
    notification.subtitle = "Your Rank : " + nowRank.toString();
    notification.body = `Add yourRank.txt to ${dataPath}`;
    notification.schedule();
}

function NotifyRankChange(previousRank:number, nowRank:number): void{
    const notification = new Notification();
    notification.title = "Score Saber Rank Change"
    notification.subtitle = `#${previousRank} -> #${nowRank}`;
    notification.schedule();
}


function NotifyError(errorSentence:string): void{
    const errorNotification = new Notification();
    errorNotification.title = "NotifySSRankingChange Error";
    errorNotification.subtitle = errorSentence;
    errorNotification.schedule();
}
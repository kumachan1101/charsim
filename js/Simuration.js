let SIM_STS_NONE = 0;
let SIM_STS_DOING = 1;
let SIM_STS_END = 2 ;


class Simuration {

    constructor(){
        this.cCmdList = [];
        this.cCreateAction = new CreateAction();
        this.cActList = [];
        this.cCurrentAct;
        this.cCurrentNo = -1;
    }

    clear(){
        this.cCmdList.length = 0;
        this.cActList.length = 0;
        this.cCurrentAct = null;
        this.cCurrentNo = -1;
        cPlayerControl.CorrectPos();
    }

    IsExecuting(){

    }

    update(){

        // 現在のコマンドが実行中かどうか
        if(this.cCurrentAct == null){
            //現在プレイヤーがいるマスの判定
            //ゲームオーバーなら終了
            //ゲームオーバ出なければ以降のアクションへ移る
            this.next();
        }
        else{
            // アクション実行可能か判定
            if(this.cCurrentAct.iStatus == CMD_STATUS_JUDGE){
                this.cCurrentAct.judge();
            }
            else if(this.cCurrentAct.iStatus == CMD_STATUS_DOING){
                // 実行中の場合は継続実行
                this.cCurrentAct.execute();
            }
            //else if(this.cCurrentAct.iStatus == CMD_STATUS_DO_JUDGE){
                // 実行後の結果判定
                //this.cCurrentAct.judge();
            //}
            // 終了の場合は次のコマンドを設定
            else{
                this.cCurrentAct = null;
                //マス未判定へ    
            }    
        }
    }

    next(){
        let iCnt = 1;
        for(let cAct of this.cActList) {
            if(cAct.iStatus != CMD_STATUS_DONE){
                cAct.iStatus = CMD_STATUS_JUDGE;
                this.cCurrentAct = cAct
                break;
            }
            iCnt += 1;
        }
        this.cCurrentNo = iCnt;
    }
        
    execute(){
        let cAct;
        for(let cCmd of this.cCmdList) {
            for (let i = 0; i < cCmd.iCnt; i++) {
                cAct = this.cCreateAction.execute(cCmd.cAct);
                this.cActList.push(cAct);
            }
        }
    }

    GetDoneCmdNum(){
        let iNum = 1;
        let iCnt = 1;
        for(let cCmd of this.cCmdList) {
            for (let i = 0; i < cCmd.iCnt; i++) {
                if(this.cCurrentNo == iCnt){
                    return iNum;
                }
                iCnt += 1;
            }
            iNum += 1;
        }
        return -1;
    }
}

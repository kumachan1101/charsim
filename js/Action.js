//input：
//・Stageクラスから取得するマス情報
//・Actionクラスから取得するアクションタイプ


class ActionJudge {
    constructor(){
    }
    
    judge(){}
    execute(){}


    // プレイヤー位置から進む方向のマス情報からアクション結果を応答
    GetActionEnable(iActionType){
        let cPos = new Pos(0,0);
        switch(iActionType){
            case ACT_FOWARD:
                cPos = cPlayerControl.GetMovedPos();
                break;
            case ACT_DIRECTION_UP:
            case ACT_DIRECTION_RIGHT:
            case ACT_DIRECTION_LEFT:
            case ACT_DIRECTION_DOWN:
            default:
                cPos = cPlayerControl.GetPos();
                break;    
        }

        let cMass = cStage.GetMass( cPos.x, cPos.y);
        if(cMass == undefined){
            return false;
        }
        let iKind = cMass.GetKind();
        let bEnable = false;

        switch(iKind){
            case MASS_KIND_BLOCK:
            case MASS_KIND_WALL:
                bEnable = false;
                break;
            case MASS_KIND_ROUTE:
            case MASS_KIND_NOROUTE:
            case MASS_KIND_START:
            case MASS_KIND_GOAL:
            default:
                bEnable = true;
                break;
        }
        return bEnable;
    }
    
}


let CMD_STATUS_NONE = 0;
let CMD_STATUS_JUDGE = 1;
let CMD_STATUS_DOING = 2;
let CMD_STATUS_DO_JUDGE = 3;
let CMD_STATUS_DONE = 4;


class Command{
    constructor(iCnt, iAct){
        this.cAct = actions[iAct];
        this.iCnt = counts[iCnt];
    }
}

class CreateAction{
    
    execute(actkind){
        let cAct;
        switch(actkind){
            case ACT_FOWARD:
                cAct = new ActionForward(actkind);
                break;
            case ACT_DIRECTION_UP:
            case ACT_DIRECTION_RIGHT:
            case ACT_DIRECTION_LEFT:
            case ACT_DIRECTION_DOWN:
                cAct = new ActionDirection(actkind);
                break;    
        }

        return cAct;
    }
}

class Action {
    constructor(iKind){
        this.iStatus = CMD_STATUS_NONE;
        this.cActJudge = new ActionJudge();
        this.iKind = iKind;
    }
    
    judge(){
        //Stageクラスに問合せして、実行制御
        let iRet = this.cActJudge.GetActionEnable(this.iKind);
        //実行可能
        if(iRet == true){
            //実行可能なら実行中へ
            this.iStatus = CMD_STATUS_DOING;
        }
        //実行不可
        else{
            //実行不可なら終了へ
            this.iStatus = CMD_STATUS_DONE;
        }
    }

    execute(){}
}


class ActionDirection extends Action{

    constructor(iKind){
        super(iKind);
        switch(iKind){
            case ACT_DIRECTION_UP:
                this.iDirection = CHARA_BACK;
                break;
            case ACT_DIRECTION_LEFT:
                this.iDirection = CHARA_LEFT;
                break;
            case ACT_DIRECTION_RIGHT:
                this.iDirection = CHARA_RIGHT;
                break;
            case ACT_DIRECTION_DOWN:
                this.iDirection = CHARA_FRONT;
                break;
        }
    }

    execute(){
        this.iStatus = CMD_STATUS_DONE;
        switch(this.iDirection){
            case CHARA_BACK:
                cPlayerControl.Direction_Up();
                break;
            case CHARA_LEFT:
                cPlayerControl.Direction_Left();
                break;
            case CHARA_RIGHT:
                cPlayerControl.Direction_Right();
                break;
            case CHARA_FRONT:
                cPlayerControl.Direction_Down();
                break;
        }
    }
}

class ActionForward extends Action{

    constructor(iKind){
        super(iKind);
        this.iRestMove = CHARACTER_LARGE;
    }

    execute(){
        if(this.iRestMove <= 0){
            this.iStatus = CMD_STATUS_DONE;
        }
        else{
            this.iStatus = CMD_STATUS_DOING;
            cPlayerControl.Foward();
            this.iRestMove -= 1;
        }
    }
}



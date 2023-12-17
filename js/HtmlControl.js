

let ACT_FOWARD = "1歩進む";
let ACT_DIRECTION_UP = "↑を向く";
let ACT_DIRECTION_RIGHT = "→を向く";
let ACT_DIRECTION_LEFT = "←を向く";
let ACT_DIRECTION_DOWN = "↓を向く";

actions = [
    ACT_FOWARD,
    ACT_DIRECTION_UP,
    ACT_DIRECTION_RIGHT,
    ACT_DIRECTION_LEFT,
    ACT_DIRECTION_DOWN
];

counts = [
    1,2,3,4,5,6,7,8,9,10
]
let MASK_BIT = 0xFFFF;
let MASK_BIT_SHIFT = 16;

class HtmlControl {


    constructor(){
        this.data1 = document.getElementById("data1");
        this.data2 = document.getElementById("data2");
        this.data3 = document.getElementById("data3");

        for (let i = 0; i < actions.length; i++) {
            var option = document.createElement("option");
            option.text = actions[i];
            option.value = i;
            this.data1.appendChild(option);
        }
        for (let i = 0; i < counts.length; i++) {
            var option = document.createElement("option");
            option.text = counts[i];
            option.value = i;
            this.data2.appendChild(option);
        }

        var option = document.createElement("option");
        option.text  = "　　　　　　　　　　　　　　　　";
        option.value = -1;
        this.data3.appendChild(option);
        this.data3[0].selected = true;

    }

    update(){
        if(cSimuration.cCurrentAct != null){
            let iNum = cSimuration.GetDoneCmdNum();
            for (let i = 0; i < data3.length; i++) {
                if(i == iNum-1){
                    this.data3[i].selected = true;   
                }
            }
        }
    }

    clickBtnAdd(){
        var data1 = cHtmlControl.data1;
        var data2 = cHtmlControl.data2;
        var data3 = cHtmlControl.data3;
        var data1_op;
        var data2_op;
        var data3_op;
        var bFlg = false;
    
        //アクション
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].selected) {
                data1_op = document.createElement("option");
                data1_op.text = data1[i].text;
                data1_op.value = data1[i].value;
            }
        }
        //カウント
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].selected) {
                data2_op = document.createElement("option");
                data2_op.text = data2[i].text;
                data2_op.value = data2[i].value;
            }
        }

        data3_op = document.createElement("option");
        data3_op.text = data2_op.text   +"回："+ data1_op.text;
        
        // 16-9bit：回数
        //  8-1bit：アクション
        var bitData = 0;
        var bitAct = 1 << data1_op.value;
        var bitCnt = 1 << data2_op.value;
        bitData = (bitCnt << MASK_BIT_SHIFT) | bitAct;
        data3_op.value = bitData;

        for (let i = 0; i < data3.length; i++) {
            if (data3[i].selected) {
                data3[i].before(data3_op);
                bFlg = true;
                break;
            }
        }
        if(!bFlg){
            data3[data3.length-1].before(data3_op);
        }
    }

    clickBtnDel(){
        var data3 = cHtmlControl.data3;
        for (let i = 0; i < data3.length; i++) {
            if (data3[i].selected && i < data3.length-1) {
                data3.remove(i);
                if(i == 0){
                    this.data3[0].selected = true;
                }
                else{
                    this.data3[i].selected = true;
                }
                
            }
        }
    }

}

function clickBtnAdd() {
    cHtmlControl.clickBtnAdd();
}

function clickBtnDel() {
    cHtmlControl.clickBtnDel();
}

function clickBtnExe() {
    /*
    if(cSimuration.IsExecuting()){
        return;
    }
    */

    this.data3[0].selected = true;
    cSimuration.clear();

    // 16-9bit：回数
    //  8-1bit：アクション
    var bitData;
    var bitAct;
    var bitCnt;

    var iPosAct;
    var iPosCnt;

    for (let i = 0; i < this.data3.length-1; i++) {
        bitData = this.data3[i].value;
        bitAct = bitData & MASK_BIT;
        bitCnt = (bitData >> MASK_BIT_SHIFT) & MASK_BIT;

        for (let ipos = 0; ipos < MASK_BIT_SHIFT; ipos++) {
            if(1 << ipos & bitCnt){
                iPosCnt = ipos;
            }

            if(1 << ipos & bitAct){
                iPosAct = ipos;
            }
        }
        var cCmd = new Command(iPosCnt, iPosAct);
        cSimuration.cCmdList.push(cCmd);
    }  

    cSimuration.execute();
}

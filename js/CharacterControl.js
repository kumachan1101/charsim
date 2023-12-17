class CharacterControl{

    constructor(){
        //キャラクターのオブジェクトを作成
        this.charalist = [];
     
    }

    push(cChara){
        this.charalist.push(cChara);
    }


    AddSprite(){
        for(let cChara of this.charalist) {
            if(undefined != cChara){
                cGameControl.add( cChara.sprite, cChara.x, cChara.y);
            }
        }
    }

}


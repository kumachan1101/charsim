let CHARA_FRONT = CHARACTER_LARGE * 0;
let CHARA_LEFT  = CHARACTER_LARGE * 1;
let CHARA_RIGHT = CHARACTER_LARGE * 2;
let CHARA_BACK  = CHARACTER_LARGE * 3;

class Pos {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class PlayerControl extends CharacterControl{

    constructor(){
        super();
        this.cPlayer = new Player( new Sprite( 'img/player.jpg', 0, CHARA_FRONT ), 0, CHARACTER_LARGE*0, 0);
        this.push(this.cPlayer);
    }

    update(){
        this.AddSprite();
    }

    SetPos(x, y){
        this.cPlayer.x = x;
        this.cPlayer.y = y;
    }

    GetPos(){
        let cPos = new Pos(this.cPlayer.x, this.cPlayer.y);
        return cPos;
    }

    GetDirection(){
        return this.cPlayer.GetDirection();
    }

    GetMovedPos(){
        let iDirection = this.GetDirection();
        let cPos = new Pos(this.cPlayer.x, this.cPlayer.y);

        switch(iDirection){
            case CHARA_BACK:
                cPos.y -= CHARACTER_LARGE;
                break;
            case CHARA_LEFT:
                cPos.x -= CHARACTER_LARGE;
                break;
            case CHARA_RIGHT:
                cPos.x += CHARACTER_LARGE;
                break;
            case CHARA_FRONT:
                cPos.y += CHARACTER_LARGE;
                break;
        }        
        return cPos;
    }
 
    CorrectPos(){
        let cPos = this.GetPos();
        let tempX = cPos.x;
        let tempY = cPos.y;
        let remain;
        tempX = Math.round(tempX);
        tempY = Math.round(tempY);

        remain = tempX % CHARACTER_LARGE;
        if(remain != 0)
        {
            tempX -= remain;
        }
        
        remain = tempY % CHARACTER_LARGE;
        if(remain != 0)
        {
            tempY -= remain;
        }

        this.SetPos(tempX, tempY);
    }

    Foward(){
        let iDirection = this.GetDirection();
        switch(iDirection){
            case CHARA_BACK:
                this.cPlayer.y = this.cPlayer.y - 1;
                break;
            case CHARA_LEFT:
                this.cPlayer.x = this.cPlayer.x - 1;
                break;
            case CHARA_RIGHT:
                this.cPlayer.x = this.cPlayer.x + 1;
                break;
            case CHARA_FRONT:
                this.cPlayer.y = this.cPlayer.y + 1;
                break;
        }        
    }

    Direction_Up(){
        this.cPlayer.SetSprite(new Sprite( 'img/player.jpg', 0, CHARA_BACK  ));
    }

    Direction_Left(){
        this.cPlayer.SetSprite(new Sprite( 'img/player.jpg', 0, CHARA_LEFT  ));
    }

    Direction_Right(){
        this.cPlayer.SetSprite(new Sprite( 'img/player.jpg', 0, CHARA_RIGHT  ));
    }

    Direction_Down(){
        this.cPlayer.SetSprite(new Sprite( 'img/player.jpg', 0, CHARA_FRONT  ));
    }


}


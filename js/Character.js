//プレイヤークラス
//x : プレイヤーのx座標
//y : プレイヤーのy座標
//move : プレイヤーをうまく動かすためのもの
//
//move_sp() : プレイヤーのスプライトを動かす


class Character {
	constructor(sprite, x, y, playerval) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
        this.playerval = playerval;
	}

	SetSprite(sprite){
		this.sprite = sprite;
	}

	GetDirection(){
		return this.sprite.top;
	}
}

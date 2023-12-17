
//グローバル変数の定義
let canvas;
let context;
let vcanvas;
let vcontext;
let CHARACTER_LARGE = 32;
let MAPLEN = 1280;
let MAPX = MAPLEN/32;
let MAPY = MAPX;
let SCREEN_WIDTH = MAPLEN/2;
let SCREEN_HEIGHT = MAPLEN/2;
let CAMERAX = 0;
let CAMERAY = 0;
let last_posx = SCREEN_WIDTH/2;
let last_posy = SCREEN_HEIGHT/2;

function imageGuard(selector){

	var guard_selector = document.querySelectorAll(selector);
  
	for(var n = 0; n < guard_selector.length; n++){
	  guard_selector[n].addEventListener("contextmenu", function(e){
		e.preventDefault();
	  }, false);
	}
  
	var guard_style = {
	  'pointer-events':'none',
	  '-webkit-touch-callout':'none',
	  '-moz-touch-callout':'none',
	  'touch-callout':'none',
	  '-webkit-user-select':'none',
	  '-moz-user-select':'none',
	  'user-select':'none'
	}
  
	Object.keys(guard_style).forEach(function(v, i, a){
	  for(var n = 0; n < guard_selector.length; n++){
		guard_selector[n].style[v] = guard_style[v];
	  }
	});
  
  }
  
  document.addEventListener("DOMContentLoaded", function() {
	imageGuard('img');
  });


//スプライトクラス
//img : スプライトに使う画像
//left : 画像の左から何ピクセルの部分を使うか
//top : 画像の上から何ピクセルの部分を使うか
class Sprite {
	constructor( img, left, top ) {
		this.left = left || 0;
    		this.top = top || 0;
		this.img = new Image();
		this.img.src = img;
		this.width = CHARACTER_LARGE;
		this.height = CHARACTER_LARGE;
	}
}
 
//ゲームクラス
//width : ゲーム全体の横幅
//height : ゲーム全体の縦幅
//
//add() : ゲームにスプライトを表示
class GameControl {
	constructor( width, height ) {
		// 描画画面
		canvas = document.getElementById('can');
		canvas.width = width;
		canvas.height = height;
 		context = canvas.getContext( '2d' );

		// 仮想画面
		vcanvas = document.createElement("canvas");
		vcanvas.width = MAPLEN;
		vcanvas.height = MAPLEN;
 		vcontext = vcanvas.getContext( '2d' );
	}

	add( sprite, x, y ) {
		if ( typeof x === "undefined" ) sprite.x = 0;
		else sprite.x = x;
		if ( typeof y === "undefined" ) sprite.y = 0;
		else sprite.y = y;
		// http://www.htmq.com/canvas/drawImage_s.shtml
		// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		// sはsourceでデータ元、dはdestinationで反映先
		if(CAMERAX-CHARACTER_LARGE <= sprite.x && sprite.x <= CAMERAX+SCREEN_WIDTH+CHARACTER_LARGE && CAMERAY-CHARACTER_LARGE <= sprite.y && sprite.y <= CAMERAY+SCREEN_HEIGHT+CHARACTER_LARGE){
			vcontext.drawImage( sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y ,sprite.width, sprite.height );
		}
	}

    update_camera(posx, posy){
        if ((SCREEN_WIDTH/2 < posx) && (posx < (MAPLEN - SCREEN_WIDTH/2))){
            if(last_posx != posx){
                let diff = posx - last_posx;
                CAMERAX = CAMERAX + diff;
                last_posx = posx;
            }
        }
        if ((SCREEN_HEIGHT/2 < posy) && (posy < (MAPLEN - SCREEN_HEIGHT/2))){
            if(last_posy != posy){
                let diff = posy - last_posy;
                CAMERAY = CAMERAY + diff;
                last_posy = posy;
            }
        }
    }

	update(){
		context.drawImage(vcanvas, CAMERAX, CAMERAY, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	}

	//isExsist(x, y){
	//	return (map[y][x] === 1);
	//}

}



class Input {

	constructor() {
		this.clear();
	}

	clear(){
		this.up = false;
		this.left = false;
		this.down = false;
		this.right = false;
		this.enter = false;
		this.shift = false;
		this.push = "";
	}

    updatestate(key_code, bState){
		switch(key_code){
		case 37:
			this.left = bState;
			break;
		case 38:
			this.up = bState;
			break;
		case 39:
			this.right = bState;
			break;
		case 40:
			this.down = bState;
			break;
		case 13:
			this.enter = bState;
			break;
		case 16:
			this.shift = bState;
			break;
			}
	}
}



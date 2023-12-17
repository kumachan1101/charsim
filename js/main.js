'use strict';

//ゲームオブジェクトの作成
let cGameControl = new GameControl( SCREEN_WIDTH, SCREEN_HEIGHT );
let cPlayerControl = new PlayerControl();
let cHtmlControl = new HtmlControl();
let cSimuration = new Simuration();
let cStage = new Stage();

function main() {
	cStage.update();
	cPlayerControl.update();
	cHtmlControl.update();
	cGameControl.update();
	cSimuration.update();
	requestAnimationFrame( main );
}
addEventListener('load', main(), false);

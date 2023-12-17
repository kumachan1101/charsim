
let MASS_KIND_ROUTE = 1;
let MASS_KIND_NOROUTE = 2;
let MASS_KIND_BLOCK = 3;
let MASS_KIND_WALL = 4;
let MASS_KIND_START = 5;
let MASS_KIND_GOAL = 6;

class Mass{

    constructor(){
    }

    GetKind(){
        return this.ikind;
    }

    GetImg(){
        return this.img;
    }

}


class MassWalk extends Mass{

    constructor(){
        super();
        this.ikind = MASS_KIND_ROUTE;
        this.img = new Sprite( 'img/map.png', 0, 0 );

    }
}

class MassWater extends Mass{

    constructor(){
        super();
        this.ikind = MASS_KIND_NOROUTE;
    }
}

class MassWall extends Mass{

    constructor(){
        super();
        this.ikind = MASS_KIND_WALL;
        this.img = new Sprite( 'img/map.png', 33, 0 );
    }
}

class MassBlock extends Mass{

    constructor(){
        super();
        this.ikind = MASS_KIND_BLOCK;
    }
}


let map = [];
//床、壁のマップチップのオブジェクトを作成


class Stage{

    constructor(){
        //this.MakeDefaultStage();
        this.InitStage();
        this.Leve1();
        //this.MakeRandStage();
    }

    //Stage生成時にステージを作成
    //levelに応じて、何回曲がってゴールにつくかを決める
    //曲がるポイントを事前に決めて、そのポイントを経由するルートを作成する
    //ポイントには右回りと左回りがあるが、どちらにするかは乱数で決定する
    //2個ポイントがあれば、スタート→1個目、1個目→2個目、2個目→ゴールのルートを作成し、
    //作成済みのルート以外は、川やブロックをランダムで埋め尽くす。
    //levelによって、ポイント数を変えていく

    InitStage(){
		for (var y=0; y<MAPY; y++) {
			/* https://prokatsu.com/javascript_array/ */
			map[y] = [];
			for (var x=0; x<MAPX; x++) {
                map[y][x] = new MassWall();
			}
		}	
    }


    MakeDefaultStage(){
		for (var y=0; y<MAPY; y++) {
			/* https://prokatsu.com/javascript_array/ */
			map[y] = [];
			for (var x=0; x<MAPX; x++) {
                if (this.isWall(x, y)) {
                    map[y][x] = new MassWall();
                }
                else{
                    map[y][x] = new MassWalk();
                }
			}
		}	
    }

    //start x0y0 goal x39y39
    //Level1 1つ目x15y15、2つ目x30y30 
    Leve1(){
        let stagelevel = this.MakeStageRand();
        let len = stagelevel.length;
        let rotate = Math.floor( Math.random() * 2 );

        for(var i = 0; i < len-1; i++){
            let PointX_start = stagelevel[0+i][0];
            let PointX_end   = stagelevel[1+i][0];
            let PointY_start = stagelevel[0+i][1];
            let PointY_end   = stagelevel[1+i][1];

            this.MakeRotationRoute(PointX_start, PointX_end, PointY_start, PointY_end, rotate);
        }
    }

    MakeStageRand(){
        var x1 = this.getRandom(  1, 5 );
        var y1 = this.getRandom(  1, 5 );
        var x2 = this.getRandom(  6, 10 );
        var y2 = this.getRandom(  6, 10 );
        var x3 = this.getRandom(  11, 15 );
        var y3 = this.getRandom(  11, 15 );
        var x4 = this.getRandom(  16, 25 );
        var y4 = this.getRandom(  16, 25 );
        var x5 = this.getRandom(  26, 35 );
        var y5 = this.getRandom(  26, 35 );
        
        let stagelevel = [[0,0],[y1, x1],[y2, x2],[y3, x3],[y4, x4],[y5, x5],[39,39]];
        return stagelevel;
    }

    getRandom( min, max ) {
        var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
        return random;
    }
    
    MakeRotationRoute(PointX_start, PointX_end, PointY_start, PointY_end, rotate){
        let y1;
        let x2;
        
        if(rotate){
            //右回り
            y1 = PointY_start;
            x2 = PointX_end;   
        }
        else{
            //左回り
            y1 = PointY_end;
            x2 = PointX_start;
        }

        for (var x1=PointX_start; x1<=PointX_end; x1++) {
            map[y1][x1] = new MassWalk();
        }
        for (var y2=PointY_start; y2<=PointY_end; y2++) {
            map[y2][x2] = new MassWalk();
        }

    }

    GetMass(iPosX, iPosY){
        /*
        少数やマスサイズで割り切れないような、配列要素参照できない座標位置で入力された場合に補正する
        */
        let tempX = iPosX;
        let tempY = iPosY;
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

        tempX /= CHARACTER_LARGE;
        tempY /= CHARACTER_LARGE;
        let  cMass = map[tempY][tempX];
        return cMass;
    }

	isWall(x, y){
		return (x % 2 == 1) && (y % 2 == 1);
	}

	update(){
		for (var y=0; y<MAPY; y++) {
			/* https://prokatsu.com/javascript_array/ */
			for (var x=0; x<MAPX; x++) {
					cGameControl.add( map[y][x].GetImg(), CHARACTER_LARGE*x, CHARACTER_LARGE*y );
			}
		}
	}	
}


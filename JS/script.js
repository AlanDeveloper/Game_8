window.onload = function Teste() {
    let tiles = [],
        answer = [];
    let startScreen = document.querySelector('#startScreen');
        startScreen.addEventListener("click",startGame,false);
    let overScreen = document.querySelector('#overScreen');

    function init() {
        for(let i = 1;i < 9;i++) {
            let tile = document.querySelector('#n' + i);
            tile.style.background = "url('IMG/n"+i+".png')";
            tile.addEventListener("click",moveTile,false);

            tiles.push(tile);
        }
        tiles.push(null);
        answer = tiles;
        render();
    }

    function render() {
        for(let i in tiles) {
            let tile = tiles[i];
            // Para verificar se uma variável não é nula deixe ela só num if
            if(tile) {
                tile.style.left = (i%3) * 100 + 110 + "px";
                if(i < 3) {
                    tile.style.top = "105px";
                } else {
                    if(i < 6) {
                        tile.style.top = "205px";
                    } else {
                        tile.style.top = "305px";
                    }
                }
            }
        }
    }

    function moveTile() {
        let index = tiles.indexOf(this);
        if(index % 3 !== 0){
            if(!tiles[index-1]) {
                tiles[index-1] = this;
                tiles[index] = null;
            }
        }
        if(index % 3 !== 2){
            if(!tiles[index+1]) {
                tiles[index+1] = this;
                tiles[index] = null;
            }
        }
        if(index > 2){
            if(!tiles[index-3]) {
                tiles[index-3] = this;
                tiles[index] = null;
            }
        }
        if(index < 6){
            if(!tiles[index+3]) {
                tiles[index+3] = this;
                tiles[index] = null;
            }
        }
        render();
        if(chkWin()) {
            overGame();
        }
    }

    function chkWin() {
        for(let i in tiles) {
            let a = tiles[i];
            let b = answer[i];
            if(a !== b){
                return false;
            }
        }
        return true;
    }

    function overGame() {
        overScreen.style.opacity = "1";
        overScreen.style.zIndex = "1";
        setTimeout(function(){
            overScreen.addEventListener("click", startGame, false);
        },500);
    }

    function randomSort(oldArray) {
        let newArray;

        do {
            newArray = [];
            while (newArray.length < oldArray.length) {
                let i = Math.floor(Math.random()*oldArray.length);
                if(newArray.indexOf(oldArray[i]) < 0) {
                    newArray.push(oldArray[i]);
                }
            }
        }while(!validGame(newArray));
        return newArray;
    }

    function validGame(array) {
        let inversions = 0;
        let len = array.length;

        for(i = 0;i < len -1;i++) {
            for(let j = i+1;j < len;j++) {
                if(array[i] && array[j] && array[i].dataset.value < array[j].dataset.value) {
                    inversions++;
                }
            }
        }
        return inversions%2 === 0;
    }

    function startGame() {
        tiles = randomSort(tiles);
        this.style.opacity = "0";
        this.style.zIndex = "-1";
        this.removeEventListener("click",startGame,false);
        render();
    }

    init();
}
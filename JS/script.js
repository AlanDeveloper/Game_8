window.onload = function Teste() {
    let tiles = [];

    function init() {
        for(let i = 1;i < 9;i++) {
            let tile = document.querySelector('#n' + i);
            tile.style.background = "url('IMG/n"+i+".png')";
            tiles.push(tile);
        }
        tiles.push(null);
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
    init();
}
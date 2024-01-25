function DomManager(content, game) {
    const subscribers = {
        'menu-button': [],
        'game-move': [], 
    } 

    function loadPage(pageCreator) {
        content.innerHTML = '';
        content.appendChild(pageCreator());
    }

    function createMenu() {
        const menuHtml = document.createElement("div");
        menuHtml.innerHTML = `
            <h1>menu</h1>
            <button id="to-game">game</button>
        `
        menuHtml.querySelector('#to-game').addEventListener("click", () => loadPage(createGame));

        return menuHtml;
    }

    function createOptions() {
        const optionsHtml = document.createElement("div");
        optionsHtml.innerHTML = `
            <h1>Options</h1>
            <button id="to-game">game</button>
        `;

        optionsHtml.querySelector("#to-game").addEventListener("click", () => loadPage(createGame));
        return optionsHtml; 
    }

    function createGame() {
        const gameHtml = document.createElement("div");

        gameHtml.innerHTML = `
            <h1>Game</h1>
            <div>
                <canvas id="board1" height="500" width="500"></canvas>
            </div>
            <button id="to-menu">Menu</button>
            <button id="to-options">Options</button>
        `

        const board = gameHtml.querySelector("#board1");
        renderBoard(board);

        board.addEventListener("click", (e) =>  {
            const results = post('game-move', {position: getGamePosition(e)})
            renderBoard(board, results[0].getBoard());
        });

        gameHtml.querySelector("#to-menu").addEventListener("click", () => loadPage(createMenu));
        gameHtml.querySelector("#to-options").addEventListener("click", () => loadPage(createOptions));

        return gameHtml;
    }

    function renderBoard(canvas, gameboard) {
        const ctx = canvas.getContext("2d");
        const WIDTH = canvas.width
        const HEIGHT = canvas.height

        const cellSize = WIDTH / 10;
        let attackList = [{x: 1, y: 1, hit: true},{x: 9, y: 3, hit: true}, {x: 0, y: 0, hit: false} ]
        
        if (gameboard) {
            attackList = gameboard.getAttacks();
        }

        console.log(attackList)

        for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.lineWidth = 1;
            ctx.rect(x*cellSize, y*cellSize, cellSize, cellSize);
            ctx.stroke();
        }}

        for (const {x, y, hit} of attackList) {
            ctx.fillStyle = (hit) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)"
            ctx.strokeStyle = "rgb(0, 0, 0)"
            ctx.lineWidth = 1;
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
            ctx.stroke();
        }
    }

    function getGamePosition(event){
        const rect = event.target.getBoundingClientRect(); 
        const x = event.clientX - rect.x
        const y = event.clientY - rect.y
        const cellSize = rect.width / 10;

        return {
            x: Math.floor(x/cellSize), 
            y: Math.floor(y/cellSize), 
        }
    }

    function renderMenu() {
        loadPage(createMenu);
    }

    function renderGame() {
        loadPage(createGame)
    }

    function renderOptions() {
        loadPage(createOptions)
    }

    function subscribe(event, callback) {
        if (subscribers[event]) {
            subscribers[event].push(callback);
        } else {
            throw new Error(`Event ${event} not exist`);
        }
    }

    function post(event, args) {
        if (subscribers[event]) {
            return subscribers[event].map(callback => callback(args))
        } 

        return [];
    }

    return {
        subscribe, 
        renderMenu,
        renderGame, 
        renderOptions,
    }

}

export {DomManager}
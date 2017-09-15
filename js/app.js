function furry(){
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function coin(){
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function game (){
    this.board = document.querySelectorAll('#board div');
    this.furry = new furry();
    this.coin = new coin();
    this.score = 0;
    var gameThis = this;

    this.index = function(x,y) {
      return x + (y * 10);
    };

    this.hideVisibleFurry = function(){
        var furryDiv = document.querySelector('.furry');
        if (furryDiv != null) {
            furryDiv.classList.remove('furry');
       }
    }

    this.showFurry  = function(){
        this.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }

    this.showCoin  = function(){
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }

    this.moveFurry = function(){
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if ( this.furry.direction === "left" ){
            this.furry.x = this.furry.x - 1;
        }else if ( this.furry.direction === "down" ){
            this.furry.y = this.furry.y - 1;
        }else if ( this.furry.direction === "up" ){
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    this.turnFurry = function(event) {
             switch (event.which) {
                 case 37:
                     this.furry.direction = 'left';
                     break;
                 case 38:
                     this.furry.direction = 'down';
                     break;
                 case 39:
                     this.furry.direction = 'right';
                     break;
                case 40:
                    this.furry.direction = 'up';
             }
    }

    this.checkCoinCollision = function(){
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
            var score = document.querySelector('#score');
            this.score++;
            score.querySelector('strong').innerText = this.score;
            gameThis.coin = new coin ();
            gameThis.showCoin();

        }
    }

    this.gameOver = function(){
        if (this.furry.x > 9 || this.furry.x < 0 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var end = document.querySelector('#over');
            end.classList.remove('invisible');
            var addPre = document.createElement('pre');
            end.appendChild(addPre).innerText= 'Game Over!';
        }
    }

    this.startGame = function(){
        var counter = 0;
        this.idSetInterval = setInterval(function(){
            gameThis.moveFurry();
        },250)
    }
};

var game = new game();
game.startGame();
game.showFurry();
game.showCoin();
document.addEventListener('keydown', function(event) {
     game.turnFurry(event);
});

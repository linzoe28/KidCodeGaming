/**
 * 定義一個 scene，用成員變數儲存 scene 上面的物件
 * override preload, create, update 函式
 */
class Scene1 extends Phaser.Scene {
    constructor() {
        super();
    }
    preload() {
        this.load.image('tiles', 'assets/tile.png');
        this.load.tilemapTiledJSON('map', 'assets/level1.json');
        this.load.spritesheet('red', 'assets/yellow_player.png', {
            frameWidth: 32,
            frameHeight: 38
        });
        this.load.image('gem', 'assets/Square without details (outline)/40-40/monkey.png');
        this.load.spritesheet('card', 'assets/card_test.jpg', {
            frameWidth: 108,
            frameHeight: 108
        });
    }
    create() {
        let map = this.make.tilemap({ key: "map" });
        let tileset = map.addTilesetImage('tile', 'tiles');
        // let gems = map.addTilesetImage('Jelly', 'gems');
        this.platforms = map.createStaticLayer('level 1', tileset, 0, 0);
        this.platforms.setCollisionByExclusion([89, 127, 128, 129, 140, , 141, 142], true);
        this.gem = map.createFromObjects('gem 1', 145, { key: 'gem' });

        this.player = new Player(this, 0, 0);
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();




        //red player anims
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('red', { start: 7, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'red', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('red', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('red', { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('red', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    }


    update() {

        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        // this. player.anims.play('turn',true);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.play('turn', true);
        }

    }
}
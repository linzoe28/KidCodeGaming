/**
 * 定義一個 scene，用成員變數儲存 scene 上面的物件
 * override preload, create, update 函式
 */
class Scene1 extends Phaser.Scene {
    constructor() {
        super();
    }
    preload() {
        // this.load.image('tiles', 'assets/tile.png');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.tilemapTiledJSON('map', 'assets/level1.json');
        this.load.spritesheet('red', 'assets/yellow_player.png', {
            frameWidth: 32,
            frameHeight: 38
        });
        this.load.image('gem', 'assets/obj/Ruby2x.png');
        this.load.image('trap1', 'assets/obj/Hole2x.png');
        this.load.image('trap2', 'assets/obj/Danger_Deadly2x.png');
        this.load.image('trap3', 'assets/obj/GardenBed_Carrots_022x.png');
        this.load.image('trap4', 'assets/obj/GardenBed_Radish_022x.png');
        this.load.image('bg', 'assets/BG.png');
        this.load.image('toolbox', 'assets/tool_box.png');

        this.load.atlas('cards', 'assets/atlas/c/card_sprite.png', 'assets/atlas/c/card_sprite.json');
    }
    create() {

        this.add.image(750,-150,'bg');
        this.add.image(1100,300,'toolbox').setScale(1.3);

        let map = this.make.tilemap({ key: "map" });
        let clouds_tile = map.addTilesetImage('cloud', 'cloud');
        let tileset = map.addTilesetImage('tileset', 'tiles');
        map.createStaticLayer('bg', tileset, 0, 0);
        map.createStaticLayer('bg-cloud', clouds_tile, 0, -120);
        this.platforms = map.createStaticLayer('level1', tileset, 0, 0);
        this.platforms.setCollisionByExclusion([51, 9], true);

        this.gem = map.createFromObjects('obj', 55, { key: 'gem' });
        this.trap1 = map.createFromObjects('obj', 42, { key: 'trap1' });
        this.trap2 = map.createFromObjects('obj', 14, { key: 'trap2' });
        this.trap3 = map.createFromObjects('obj', 23, { key: 'trap3' });
        this.trap4 = map.createFromObjects('obj', 26, { key: 'trap4' });

        this.player = new Player(this, 125, 125);
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();

        //atlas card
        var height = 400;
        var frames = this.textures.get('cards').getFrameNames();
        console.log(frames);
        var x = 140;
        var y = 100;
        for (var i = 0; i < frames.length; i++) {
            if (frames[i] != "IFELSE.png") {
                var image = this.add.sprite(700 + x, y, 'cards', frames[i]).setScale(300 / height).setInteractive();
                this.input.setDraggable(image);
                x += 120;
            }

        }

        // var image = this.add.sprite(850, 100, 'cards').setScale(300 / height).setInteractive();

        this.input.setDraggable(image);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            // gameObject.setScale(gameObject.y / height);

            gameObject.x = pointer.x;
            gameObject.y = pointer.y;

        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

        });

        //  A drop zone
        var zone = this.add.zone(0, 600, 1500, 130).setDropZone();

        //  Just a visual display of the drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);




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
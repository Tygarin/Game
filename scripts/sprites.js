function createNewImage(count, url) {
    let arr = []
    for (let i = 0; i < count; i++) {
        arr.push(new Image())
        arr[i].src = url + (i + 1) + '.png'
    }
    return arr
}

const mainHeroSprites = {
    left_idle: createNewImage(11, 'images/suncov_idle_left/suncov_idle'),
    right_idle: createNewImage(11, 'images/suncov_idle_right/suncov_idle'),
    left_run: createNewImage(8, 'images/suncov_run_left/suncov_run'),
    right_run: createNewImage(8, 'images/suncov_run_right/suncov_run'),
    left_shot: createNewImage(8, 'images/suncov_shot_left/suncov_shot'),
    right_shot: createNewImage(8, 'images/suncov_shot_right/suncov_shot'),
}

const enemyHero = {
    left_idle: createNewImage(1, 'images/enemyLeft'),
    right_idle: createNewImage(1, 'images/enemyRight'),
    left_dead: createNewImage(13, 'images/enemy_dead/enemy_dead_left/enemy_dead'),
    right_dead: createNewImage(13, 'images/enemy_dead/enemy_dead_right/enemy_dead'),
}
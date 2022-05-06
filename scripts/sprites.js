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
    left: 'images/enemyLeft.png',
    right: 'images/enemyRight.png'
}
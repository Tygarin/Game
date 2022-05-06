const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height
const playerSpeed = 5
const fallSpeed = 3
const gravity = .2
const bulletSize = 15
const bulletSpeed = 15
const paddingBottom = 50

const abstractLevel = new AbstractLevel({
    bgImage: 'images/bg.png',
    mainHeroSettings: { x: 30, y: 0, pos: 'right', health: 5 },
    enemySettings: [
        {
            x: 1000,
            y: 0,
            botsCondition: 'shooting',
        },
        {
            x: 1200,
            y: 0,
            botsCondition: 'shooting',
            pos: 'right',
        },
        {
            x: 900,
            y: 0,
            botsCondition: 'shooting',
            pos: 'right',
        },
    ],
    platforms: [
        { x: 900, y: 200 },
        { x: 600, y: 650 },
        { x: 500, y: 650 }
    ]
})

abstractLevel.animate()
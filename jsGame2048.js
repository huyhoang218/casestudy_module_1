let board
let score = 0
let rows = 4
let columns = 4

window.onload = function () {
    createBoard()
}

function createBoard() {
    // board = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ]
    board = [
        [2, 4, 8, 16],
        [8, 128, 64, 32],
        [256, 2048, 4096, 2],
        [512, 1024, 16, 2]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div')
            tile.id = r.toString() + ',' + c.toString()
            let num = board[r][c]
            updateTile(tile, num)
            document.getElementById('board').append(tile)
        }
    }
    setNumber()
    setNumber()
}


function updateTile(tile, num) {
    tile.innerText = ''
    tile.classList.value = ''
    tile.classList.add('tile')
    if (num > 0) {
        tile.innerText = num
        if (num <= 4096) {
            tile.classList.add('x' + num.toString())
        } else {
            tile.classList.add('x8192')
        }
    }
}

// idea: [2,2,2,0]
// xóa số 0 -> [2,2,2]
// [4,0,2]
// xóa số 0 [4,2]
// đặt lại số 0 ở những ô trống: [4,2,0,0]

document.addEventListener('keyup', function control(e) {
    if (e.code === 'ArrowLeft') {
        moveLeft()
        setNumber()
    } else if (e.code === 'ArrowRight') {
        moveRight()
        setNumber()
    } else if (e.code === 'ArrowUp') {
        moveUp()
        setNumber()
    } else if (e.code === 'ArrowDown') {
        moveDown()
        setNumber()
    }
    document.getElementById('score').innerText = score
})

function filterEmpty(row) {
    return row.filter(function checkEmpty(num) {
        return num != 0
    })
}

function move(row) {
    row = filterEmpty(row)
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2
            row[i + 1] = 0
            score += row[i]
        }
    }
    row = filterEmpty(row)
    while (row.length < columns) {
        row.push(0)
    }
    return row
}

function moveLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row = move(row)
        board[r] = row

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + ',' + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
    displayGameOver()
}

function moveRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row.reverse()
        row = move(row)
        row.reverse()
        board[r] = row

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + ',' + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
    displayGameOver()
}
// idea: tạo 1 hàng mới là cột của bảng
// khi trượt cột lên là trượt hàng đó sang trái
function moveUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = move(row)
        // board[0][c] = row[0]
        // board[1][c] = row[1]
        // board[2][c] = row[2]
        // board[3][c] = row[3]

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + ',' + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
    displayGameOver()
}

function moveDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row.reverse()
        row = move(row)
        row.reverse()

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + ',' + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
    displayGameOver()
}

function checkEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                return true
            }
        }
    }
    return false
}

function setNumber() {
    if (!checkEmptyTile()) {
        return
    }
    let find = false
    while (!find) {
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)

        if (board[r][c] === 0) {
            board[r][c] = 2
            let tile = document.getElementById(r.toString() + ',' + c.toString())
            tile.innerText = '2'
            tile.classList.add('x2')
            find = true
        }
    }
}

function checkGameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                return false
            }
        }
    }

    for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return false
            }
            if (c < columns - 1 && board[r][c] === board[r + 1][c]) {
                return false
            }
        }
    }

    return true
}

function displayGameOver() {
    if (checkGameOver()) {
        document.getElementById('gameOver').style.display = 'flex'
    }
}

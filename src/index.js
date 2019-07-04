const fs = require('fs')
const path = require('path')
var zlib = require('zlib')
const excel = require('excel4node')
const child_process = require('child_process')


const filesPath = path.join(__dirname, '../Access_LOG/PACCAIBOTW803G/access.log.20190501_0000')
const folderPath = path.join(__dirname, '../Access_LOG/PACCAIBOTW803G/')
const dateFolders = fs.readdirSync(folderPath)

fs.readFile(filesPath, "utf8", function (err, data) {
    if (err) throw err;
    // console.log(new Buffer(data,'base64'))
    // console.log(data)
    // const grep = child_process.execSync(`cat ${filesPath} | grep "AIS LINE Fibre Connect`)
    // console.log(grep)
})

const wb = new excel.Workbook()
const ws = wb.addWorksheet('Sheet 1')
let countNumber = 0
let countList = []



for (const dateFolder of dateFolders) {
    const spliteDate = dateFolder.split('access.log.')[1]
    if (spliteDate) {
        // console.log(spliteDate)

        const splitTime = spliteDate.split('_')
        const getDate = splitTime[0]
        const countClick = checkClick(dateFolder)
        if (countList.indexOf(countClick.date) < 0) {
            countList.push(countClick.date)
            countNumber = 0
        }
        countNumber += countClick.number
        ws.cell(1, 1).string('Date')
        ws.cell(1, 2).string('Count')
        ws.cell(countList.indexOf(countClick.date) + 2, 1).string(countClick.date)
        ws.cell(countList.indexOf(countClick.date) + 2, 2).number(countNumber)
        // if (countClick.date === splitTime[0]) {
        //     if (countClick.date === '20190502') {
        //         countNumber = 0
        //     }
        //     countNumber += countClick.number
        // } else {
        //     // countNumber = countClick
        // }
        console.log(`date => ${getDate}`, countNumber)
        console.log(countList)
    }
}
wb.write('Excel.xlsx')
function checkClick(date) {
    let count = 0
    const datePath = `${folderPath}${date}`
    const test = 'access.log.20190501_0000'
    const grep = child_process.execSync(`cat ${datePath} | grep "AIS Fibre LINE Connect" | wc -l`).toString()
    // console.log(`date => ${date}`,parseInt(grep))
    // console.log(datePath)
    const spliteDate = date.split('access.log.')[1]
    // console.log(spliteDate)
    if (spliteDate) {
        const splitTime = spliteDate.split('_')
        const getDate = splitTime[0]
        if (getDate === splitTime[0]) {
            count += parseInt(grep)
        }
        return { number: parseInt(grep), date: splitTime[0] }
    }
}

// console.log(files)

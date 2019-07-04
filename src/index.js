const fs = require('fs')
const path = require('path')
const moment = require('moment')
const excel = require('excel4node')
const child_process = require('child_process')

const folderPath = path.join(__dirname, '../Access_LOG/PACCAIBOTW803G/')
const dateFolders = fs.readdirSync(folderPath)


const wb = new excel.Workbook()
const ws = wb.addWorksheet('Sheet 1')
let countNumber = 0
let countList = []



for (const dateFolder of dateFolders) {
    const spliteDate = dateFolder.split('access.log.')[1]
    if (spliteDate) {
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
        ws.cell(countList.indexOf(countClick.date) + 2, 1).string(moment(countClick.date).format('DD-MM-YYYY'))
        ws.cell(countList.indexOf(countClick.date) + 2, 2).number(countNumber)
        console.log(`date => ${getDate}`, countNumber)
        console.log(countList)
    }
}
wb.write('Excel_1.xlsx')
function checkClick(date) {
    let count = 0
    const datePath = `${folderPath}${date}`
    const grep = child_process.execSync(`cat ${datePath} | grep "AIS Fibre LINE Connect" | wc -l`).toString()
    const spliteDate = date.split('access.log.')[1]
    if (spliteDate) {
        const splitTime = spliteDate.split('_')
        const getDate = splitTime[0]
        if (getDate === splitTime[0]) {
            count += parseInt(grep)
        }
        return { number: parseInt(grep), date: splitTime[0] }
    }
}

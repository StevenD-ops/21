import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {
try {
let vn = './media/menu.mp3'
let pp = './Menu2.jpg'
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])



let str = `
𝑯𝑶𝑳𝑨 ${name} 𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑰𝑫𝑶 𝑨 𝑩𝑬𝑵𝑫𝑬𝑹-𝑩𝑶𝑻

 𝙵𝙴𝙲𝙷𝙰: ${week}, ${date}
 𝚃𝙸𝙴𝙼𝙿𝙾 𝙰𝙲𝚃𝙸𝚅𝙾: ${uptime}
 𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂: ${rtotalreg}

𝑷𝒖𝒆𝒅𝒆𝒔 𝒆𝒔𝒄𝒓𝒊𝒃𝒊𝒓 ''${usedPrefix}𝒎𝒆𝒏𝒖'' 𝒑𝒂𝒓𝒂 𝒂𝒄𝒄𝒆𝒅𝒆𝒓 𝒂𝒍 𝒎𝒆𝒏ú
 𝒑𝒓𝒊𝒏𝒄𝒊𝒑𝒂𝒍.

𝑺𝒊 𝒅𝒆𝒔𝒆𝒂𝒔 𝒉𝒂𝒄𝒆𝒓 𝒖𝒏 𝒔𝒕𝒊𝒄𝒌𝒆𝒓 𝒅𝒆 𝒖𝒏𝒂 𝒊𝒎𝒂𝒈𝒆𝒏/𝒇𝒐𝒕𝒐/𝒈𝒊𝒇 𝒔𝒐𝒍𝒐 𝒅𝒆𝒃𝒆𝒔 𝒅𝒆 𝒆𝒏𝒗𝒊𝒂𝒓 𝒐 𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒓 𝒆𝒍 𝒄𝒐𝒏𝒕𝒆𝒏𝒊𝒅𝒐 𝒆𝒍𝒆𝒈𝒊
𝒅𝒐 𝒄𝒐𝒏 𝒍𝒂 𝒑𝒂𝒍𝒂𝒃𝒓𝒂 ''${usedPrefix}𝒔𝒕𝒊𝒄𝒌𝒆𝒓''

I̳N̳F̳O̳R̳M̳A̳C̳I̳O̳N̳ ̳D̳E̳ ̳B̳E̳N̳D̳E̳R̳

${usedPrefix}𝒈𝒓𝒖𝒑𝒐𝒔
${usedPrefix}𝒆𝒔𝒕𝒂𝒅𝒐
${usedPrefix}𝒊𝒏𝒇𝒐𝒃𝒐𝒕
${usedPrefix}𝒈𝒓𝒐𝒖𝒑𝒍𝒊𝒔𝒕
${usedPrefix}𝒐𝒘𝒏𝒆𝒓

𝑷𝒂𝒓𝒂 𝑯𝒂𝒃𝒍𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝑩𝒐𝒕 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒄𝒓𝒊𝒃𝒊𝒓
${usedPrefix}𝑩𝒐𝒕 + (𝒄𝒐𝒎𝒆𝒏𝒕𝒂𝒓𝒊𝒐𝒔)

I̳N̳G̳R̳E̳S̳A̳ ̳A̳ ̳B̳E̳N̳D̳E̳R̳ ̳A̳ ̳T̳U̳ ̳G̳R̳U̳P̳O̳

${usedPrefix}𝒋𝒐𝒊𝒏 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>


R̳E̳P̳O̳R̳T̳E̳ ̳D̳E̳ ̳F̳A̳L̳L̳O̳S̳

 ${usedPrefix}𝒓𝒆𝒑𝒐𝒓𝒕𝒆 <𝒕𝒆𝒙𝒕𝒐>


┌──⭓  𝐌𝐞𝐧𝐮 𝐝𝐞 𝐂𝐨𝐧𝐯𝐞𝐫𝐬𝐢ó𝐧
│
│ ${usedPrefix}𝒔𝒕𝒊𝒄𝒌𝒆𝒓 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒓 𝒂 𝒊𝒎𝒂𝒈𝒆𝒏 𝒐 𝒗𝒊𝒅𝒆𝒐>
│ ${usedPrefix}𝒔𝒕𝒊𝒄𝒌𝒆𝒓 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒔 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒓 𝒂 𝒊𝒎𝒂𝒈𝒆𝒏 𝒐 𝒗𝒊𝒅𝒆𝒐>
│ ${usedPrefix}𝒔 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒆𝒎𝒐𝒋𝒊𝒎𝒊𝒙 <𝒆𝒎𝒐𝒋𝒊 1>&<𝒆𝒎𝒐𝒋𝒊 2>
│ ${usedPrefix}𝒔𝒄𝒊𝒓𝒄𝒍𝒆 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒓 𝒂 𝒊𝒎𝒂𝒈𝒆𝒏>
│ ${usedPrefix}𝒔𝒆𝒎𝒐𝒋𝒊 <𝒕𝒊𝒑𝒐> <𝒆𝒎𝒐𝒋𝒊>
│ ${usedPrefix}𝒂𝒕𝒕𝒑 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒂𝒕𝒕𝒑2 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒕𝒑 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒕𝒑2 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒕𝒑3 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒕𝒑4 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒕𝒑5 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒑𝒂𝒕 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒔𝒍𝒂𝒑 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒌𝒊𝒔𝒔 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒅𝒂𝒅𝒐
│ ${usedPrefix}𝒘𝒎 <𝒑𝒂𝒄𝒌𝒏𝒂𝒎𝒆> <𝒂𝒖𝒕𝒉𝒐𝒓>
│ ${usedPrefix}𝒔𝒕𝒊𝒄𝒌𝒆𝒓𝒎𝒂𝒓𝒌𝒆𝒓 <𝒆𝒇𝒆𝒄𝒕𝒐> <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒓 𝒂 𝒊𝒎𝒂𝒈𝒆𝒏>
│ ${usedPrefix}𝒔𝒕𝒊𝒄𝒌𝒆𝒓𝒇𝒊𝒍𝒕𝒆𝒓 <𝒆𝒇𝒆𝒄𝒕𝒐> <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆𝒓 𝒂 𝒊𝒎𝒂𝒈𝒆𝒏>
│
└───────⭓


┌──⭓  𝑴𝑬𝑵𝑼 𝑫𝑬 𝑮𝑹𝑼𝑷𝑶𝑺
│ ${usedPrefix}𝒂𝒅𝒅 <𝒏𝒖𝒎𝒆𝒓𝒐>
│ ${usedPrefix}𝒌𝒊𝒄𝒌 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒈𝒓𝒖𝒑𝒐 <𝒂𝒃𝒓𝒊𝒓 / 𝒄𝒆𝒓𝒓𝒂𝒓>
│ ${usedPrefix}𝒑𝒓𝒐𝒎𝒐𝒕𝒆 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒅𝒆𝒎𝒐𝒕𝒆 <@𝒕𝒂𝒈>
│ 𝒂𝒅𝒎𝒊𝒏𝒔 <𝒕𝒆𝒙𝒕𝒐> (𝑢𝑠𝑜 𝑠𝑖𝑛 𝑝𝑟𝑒𝑓𝑖𝑗𝑜)
│ ${usedPrefix}𝒅𝒆𝒎𝒐𝒕𝒆 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒊𝒏𝒇𝒐𝒈𝒓𝒐𝒖𝒑
│ ${usedPrefix}𝒍𝒊𝒏𝒌
│ ${usedPrefix}𝒔𝒆𝒕𝒏𝒂𝒎𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒔𝒆𝒕𝒅𝒆𝒔𝒄 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒊𝒏𝒗𝒐𝒄𝒂𝒓 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒔𝒆𝒕𝒘𝒆𝒍𝒄𝒐𝒎𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒔𝒆𝒕𝒃𝒚𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒉𝒊𝒅𝒆𝒕𝒂𝒈 <𝒕𝒆𝒙𝒕𝒐>
│
└───────⭓


┌──⭓  𝑫𝑬𝑺𝑪𝑨𝑹𝑮𝑨𝑺
│
│ ${usedPrefix}𝒚𝒕𝒎𝒑3 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒚𝒕𝒎𝒑4 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒚𝒕𝒎𝒑3𝒅𝒐𝒄 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒚𝒕𝒎𝒑4𝒅𝒐𝒄 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒑𝒍𝒂𝒚.1 <𝒕𝒆𝒙𝒕𝒐 / 𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒑𝒍𝒂𝒚.2 <𝒕𝒆𝒙𝒕𝒐 / 𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒑𝒍𝒂𝒚 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒑𝒍𝒂𝒚𝒅𝒐𝒄 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒑𝒍𝒂𝒚𝒍𝒊𝒔𝒕 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒑𝒍𝒂𝒚𝒍𝒊𝒔𝒕2 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒔𝒑𝒐𝒕𝒊𝒇𝒚 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒊𝒎𝒂𝒈𝒆𝒏 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒑𝒊𝒏𝒕𝒆𝒓𝒆𝒕 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒘𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒘𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓2 <𝒕𝒆𝒙𝒕𝒐>
│
└───────⭓


┌──⭓  𝑩𝑼𝑺𝑪𝑨𝑫𝑶𝑹𝑬𝑺
│
│ ${usedPrefix}𝒙𝒏𝒙𝒙𝒔𝒆𝒂𝒓𝒄𝒉 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒂𝒏𝒊𝒎𝒆𝒊𝒏𝒇𝒐 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒈𝒐𝒐𝒈𝒍𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒍𝒆𝒕𝒓𝒂 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒘𝒊𝒌𝒊𝒑𝒆𝒅𝒊𝒂 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒚𝒕𝒔𝒆𝒂𝒓𝒄𝒉 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒂𝒑𝒌𝒅𝒐𝒏𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒂𝒑𝒌𝒈𝒐𝒐𝒈𝒍𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒂𝒑𝒌𝒎𝒐𝒅𝒚 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒂𝒑𝒌𝒔𝒉𝒖𝒃 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒉𝒂𝒑𝒑𝒚𝒎𝒐𝒅 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒉𝒐𝒔𝒕𝒂𝒑𝒌 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒓𝒆𝒗𝒅𝒍 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒐𝒓𝒂𝒄𝒄𝒊𝒏𝒐 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒖𝒂𝒑𝒌𝒑𝒓𝒐 <𝒕𝒆𝒙𝒕𝒐>
│
└───────⭓


┌──⭓  𝑱𝒖𝒆𝒈𝒐𝒔
│
│ ${usedPrefix}𝒎𝒂𝒕𝒆𝒔 <𝒏𝒐𝒐𝒃 / 𝒆𝒂𝒔𝒚 / 𝒎𝒆𝒅𝒊𝒖𝒎 / 𝒉𝒂𝒓𝒅 / 𝒆𝒙𝒕𝒓𝒆𝒎𝒆 /𝒊𝒎𝒑𝒐𝒔𝒔𝒊𝒃𝒍𝒆 /𝒊𝒎𝒑𝒐𝒔𝒔𝒊𝒃𝒍𝒆2>
│ ${usedPrefix}𝒑𝒑𝒕 <𝒑𝒂𝒑𝒆𝒍 / 𝒕𝒊𝒋𝒆𝒓𝒂 /𝒑𝒊𝒆𝒅𝒓𝒂>
│ ${usedPrefix}𝒑𝒓𝒐𝒔𝒕𝒊𝒕𝒖𝒕𝒐 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒑𝒓𝒐𝒔𝒕𝒊𝒕𝒖𝒕𝒂 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒈𝒂𝒚2 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒍𝒆𝒔𝒃𝒊𝒂𝒏𝒂 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒑𝒂𝒋𝒆𝒓𝒐 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒑𝒂𝒋𝒆𝒓𝒂 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒑𝒖𝒕𝒐 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒑𝒖𝒕𝒂 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒎𝒂𝒏𝒄𝒐 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒎𝒂𝒏𝒄𝒂 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒓𝒂𝒕𝒂 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒍𝒐𝒗𝒆 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒅𝒐𝒙𝒆𝒂𝒓 <𝒏𝒐𝒎𝒃𝒓𝒆 / @𝒕𝒂𝒈>
│ ${usedPrefix}𝒑𝒓𝒆𝒈𝒖𝒏𝒕𝒂 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒔𝒍𝒐𝒕 <𝒂𝒑𝒖𝒆𝒔𝒕𝒂>
│ ${usedPrefix}𝒑𝒗𝒑 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒔𝒊𝒎𝒊 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒐𝒑𝒈𝒂𝒚𝒔
│ ${usedPrefix}𝒕𝒐𝒑𝒐𝒕𝒂𝒌𝒖𝒔
│ ${usedPrefix}𝒇𝒐𝒓𝒎𝒂𝒓𝒑𝒂𝒓𝒆𝒋𝒂
│ ${usedPrefix}𝒗𝒆𝒓𝒅𝒂𝒅
│ ${usedPrefix}𝒓𝒆𝒕𝒐
│
└───────⭓


┌──⭓  𝑪𝑶𝑵𝑽𝑬𝑹𝑻𝑰𝑫𝑶𝑹𝑬𝑺
│
│ ${usedPrefix}𝒕𝒐𝒊𝒎𝒈 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒔𝒕𝒊𝒄𝒌𝒆𝒓>
│ ${usedPrefix}𝒕𝒐𝒎𝒑3 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒗𝒊𝒅𝒆𝒐 / 𝒏𝒐𝒕𝒂 𝒅𝒆 𝒗𝒐𝒛>
│ ${usedPrefix}𝒕𝒐𝒑𝒕𝒕 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒗𝒊𝒅𝒆𝒐 / 𝒂𝒖𝒅𝒊𝒐>
│ ${usedPrefix}𝒕𝒐𝒗𝒊𝒅𝒆𝒐 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒂𝒖𝒅𝒊𝒐>
│ ${usedPrefix}𝒕𝒐𝒖𝒓𝒍 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒗𝒊𝒅𝒆𝒐 / 𝒊𝒎𝒂𝒈𝒆𝒏 / 𝒂𝒖𝒅𝒊𝒐>
│ ${usedPrefix}𝒕𝒕𝒔 𝒆𝒔 <𝒕𝒆𝒙𝒕𝒐>
│
└───────⭓


┌──⭓  𝑪𝒐𝒏𝒗𝒆𝒓𝒔𝒂𝒄𝒊𝒐𝒏𝒆𝒔 𝒂𝒏𝒐𝒏𝒊𝒎𝒂𝒔
│
│ ${usedPrefix}𝒔𝒕𝒂𝒓𝒕
│ ${usedPrefix}𝒏𝒆𝒙𝒕
│ ${usedPrefix}𝒍𝒆𝒂𝒗𝒆
│
└───────⭓


┌──⭓ 𝑴𝑨𝑺 𝑫𝑬 +18
│
│ ${usedPrefix}𝒑𝒂𝒄𝒌
│ ${usedPrefix}𝒑𝒂𝒄𝒌2
│ ${usedPrefix}𝒑𝒂𝒄𝒌3
│ ${usedPrefix}𝒗𝒊𝒅𝒆𝒐𝒙𝒙𝒙
│ ${usedPrefix}𝒕𝒆𝒕𝒂𝒔
│ ${usedPrefix}𝒃𝒐𝒐𝒕𝒚
│ ${usedPrefix}𝒆𝒄𝒄𝒉𝒊
│ ${usedPrefix}𝒇𝒖𝒓𝒓𝒐
│ ${usedPrefix}𝒊𝒎𝒂𝒈𝒆𝒏𝒍𝒆𝒔𝒃𝒊𝒂𝒏𝒔
│ ${usedPrefix}𝒑𝒂𝒏𝒕𝒊𝒆𝒔
│ ${usedPrefix}𝒑𝒆𝒏𝒆
│ ${usedPrefix}𝒑𝒐𝒓𝒏𝒐
│ ${usedPrefix}𝒑𝒐𝒓𝒏𝒐2
│ ${usedPrefix}𝒓𝒂𝒏𝒅𝒐𝒎𝒙𝒙𝒙
│ ${usedPrefix}𝒑𝒆𝒄𝒉𝒐𝒔
│ ${usedPrefix}𝒚𝒂𝒐𝒊
│ ${usedPrefix}𝒚𝒂𝒐𝒊2
│ ${usedPrefix}𝒚𝒖𝒓𝒊
│ ${usedPrefix}𝒚𝒖𝒓𝒊2
│ ${usedPrefix}𝒕𝒓𝒂𝒑𝒊𝒕𝒐
│ ${usedPrefix}𝒉𝒆𝒏𝒕𝒂𝒊
│ ${usedPrefix}𝒑𝒊𝒆𝒔
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒍𝒐𝒍𝒊
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒐𝒓𝒈𝒚
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒇𝒐𝒐𝒕
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒂𝒔𝒔
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒃𝒅𝒔𝒎
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒄𝒖𝒎
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒆𝒓𝒐
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒇𝒆𝒎𝒅𝒐𝒎
│ ${usedPrefix}𝒏𝒔𝒇𝒘𝒈𝒍𝒂𝒔𝒔
│
└───────⭓


┌──⭓  𝑹𝑨𝑵𝑫𝑶𝑴
│
│ ${usedPrefix}𝒄𝒓𝒊𝒔𝒕𝒊𝒂𝒏𝒐𝒓𝒐𝒏𝒂𝒍𝒅𝒐
│ ${usedPrefix}𝒎𝒆𝒔𝒔𝒊
│ ${usedPrefix}𝒎𝒆𝒎𝒆
│ ${usedPrefix}𝒊𝒕𝒛𝒚
│ ${usedPrefix}𝒃𝒍𝒂𝒄𝒌𝒑𝒊𝒏𝒌
│ ${usedPrefix}𝒌𝒑𝒐𝒑 <𝒃𝒍𝒂𝒄𝒌𝒑𝒊𝒏𝒌 / 𝒆𝒙𝒐 / 𝒃𝒕𝒔>
│ ${usedPrefix}𝒍𝒐𝒍𝒊𝒗𝒊𝒅
│ ${usedPrefix}𝒍𝒐𝒍𝒊
│ ${usedPrefix}𝒏𝒂𝒗𝒊𝒅𝒂𝒅
│ ${usedPrefix}𝒑𝒑𝒄𝒐𝒖𝒑𝒍𝒆
│ ${usedPrefix}𝒏𝒆𝒌𝒐
│ ${usedPrefix}𝒘𝒂𝒊𝒇𝒖
│ ${usedPrefix}𝒂𝒌𝒊𝒓𝒂
│ ${usedPrefix}𝒂𝒌𝒊𝒚𝒂𝒎𝒂
│ ${usedPrefix}𝒂𝒏𝒏𝒂
│ ${usedPrefix}𝒂𝒔𝒖𝒏𝒂
│ ${usedPrefix}𝒂𝒚𝒖𝒛𝒂𝒘𝒂
│ ${usedPrefix}𝒃𝒐𝒓𝒖𝒕𝒐
│ ${usedPrefix}𝒄𝒉𝒊𝒉𝒐
│ ${usedPrefix}𝒄𝒉𝒊𝒕𝒐𝒈𝒆
│ ${usedPrefix}𝒅𝒆𝒊𝒅𝒂𝒓𝒂
│ ${usedPrefix}𝒆𝒓𝒛𝒂
│ ${usedPrefix}𝒆𝒍𝒂𝒊𝒏𝒂
│ ${usedPrefix}𝒆𝒃𝒂
│ ${usedPrefix}𝒆𝒎𝒊𝒍𝒊𝒂
│ ${usedPrefix}𝒉𝒆𝒔𝒕𝒊𝒂
│ ${usedPrefix}𝒉𝒊𝒏𝒂𝒕𝒂
│ ${usedPrefix}𝒊𝒏𝒐𝒓𝒊
│ ${usedPrefix}𝒊𝒔𝒖𝒛𝒖
│ ${usedPrefix}𝒊𝒕𝒂𝒄𝒉𝒊
│ ${usedPrefix}𝒊𝒕𝒐𝒓𝒊
│ ${usedPrefix}𝒌𝒂𝒈𝒂
│ ${usedPrefix}𝒌𝒂𝒈𝒖𝒓𝒂
│ ${usedPrefix}𝒌𝒂𝒐𝒓𝒊
│ ${usedPrefix}𝒌𝒆𝒏𝒆𝒌𝒊
│ ${usedPrefix}𝒌𝒐𝒕𝒐𝒓𝒊
│ ${usedPrefix}𝒌𝒖𝒓𝒖𝒎𝒊
│ ${usedPrefix}𝒎𝒂𝒅𝒂𝒓𝒂
│ ${usedPrefix}𝒎𝒊𝒌𝒂𝒔𝒂
│ ${usedPrefix}𝒎𝒊𝒌𝒖
│ ${usedPrefix}𝒎𝒊𝒏𝒂𝒕𝒐
│ ${usedPrefix}𝒏𝒂𝒓𝒖𝒕𝒐
│ ${usedPrefix}𝒏𝒆𝒛𝒖𝒌𝒐
│ ${usedPrefix}𝒔𝒂𝒈𝒊𝒓𝒊
│ ${usedPrefix}𝒔𝒂𝒔𝒖𝒌𝒆
│ ${usedPrefix}𝒔𝒂𝒌𝒖𝒓𝒂
│ ${usedPrefix}𝒄𝒐𝒔𝒑𝒍𝒂𝒚
│
└───────⭓


┌──⭓  𝑬𝑭𝑬𝑪𝑻𝑶𝑺
│
│ ${usedPrefix}𝒍𝒐𝒈𝒐𝒔 <𝒆𝒇𝒆𝒄𝒕𝒐> <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒍𝒐𝒈𝒐𝒄𝒐𝒓𝒂𝒛𝒐𝒏 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒍𝒐𝒈𝒐𝒄𝒉𝒓𝒊𝒔𝒕𝒎𝒂𝒔 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒔𝒊𝒎𝒑𝒄𝒂𝒓𝒅 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒉𝒐𝒓𝒏𝒚𝒄𝒂𝒓𝒅 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒍𝒐𝒍𝒊𝒄𝒆 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒚𝒕𝒄𝒐𝒎𝒎𝒆𝒏𝒕 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒊𝒕𝒔𝒔𝒐𝒔𝒕𝒖𝒑𝒊𝒅
│ ${usedPrefix}𝒑𝒊𝒙𝒆𝒍𝒂𝒓
│ ${usedPrefix}𝒃𝒍𝒖𝒓
│
└───────⭓

┌──⭓  𝑬𝑭𝑹𝑬𝑪𝑻𝑶 𝑫𝑬 𝒂𝒖𝒅𝒊𝒐𝒔
│   𝑹𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒖 𝒂𝒖𝒅𝒊𝒐
│
│ ${usedPrefix}𝒃𝒂𝒔𝒔
│ ${usedPrefix}𝒃𝒍𝒐𝒘𝒏
│ ${usedPrefix}𝒅𝒆𝒆𝒑
│ ${usedPrefix}𝒆𝒂𝒓𝒓𝒂𝒑𝒆
│ ${usedPrefix}𝒇𝒂𝒔𝒕
│ ${usedPrefix}𝒇𝒂𝒕
│ ${usedPrefix}𝒏𝒊𝒈𝒉𝒕𝒄𝒐𝒓𝒆
│ ${usedPrefix}𝒓𝒆𝒗𝒆𝒓𝒔𝒆
│ ${usedPrefix}𝒓𝒐𝒃𝒐𝒕
│ ${usedPrefix}𝒔𝒍𝒐𝒘
│ ${usedPrefix}𝒔𝒎𝒐𝒐𝒕𝒉
│ ${usedPrefix}𝒕𝒖𝒑𝒂𝒊
│
└───────⭓


┌──⭓  𝑬𝑪𝑶𝑵𝑶𝑴𝑰𝑨
│
│ ${usedPrefix}𝒃𝒂𝒍𝒂𝒏𝒄𝒆
│ ${usedPrefix}𝒄𝒍𝒂𝒊𝒎
│ ${usedPrefix}𝒕𝒐𝒑
│ ${usedPrefix}𝒍𝒆𝒗𝒆𝒍𝒖𝒑
│ ${usedPrefix}𝒎𝒚𝒏𝒔
│ ${usedPrefix}𝒑𝒆𝒓𝒇𝒊𝒍
│ ${usedPrefix}𝒘𝒐𝒓𝒌
│ ${usedPrefix}𝒎𝒊𝒏𝒂𝒓
│ ${usedPrefix}𝒃𝒖𝒚
│ ${usedPrefix}𝒃𝒖𝒚𝒂𝒍𝒍
│ ${usedPrefix}𝒕𝒓𝒂𝒏𝒔𝒇𝒆𝒓 <𝒕𝒊𝒑𝒐> <𝒄𝒂𝒏𝒕𝒊𝒅𝒂𝒅> <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒗𝒆𝒓𝒊𝒇𝒊𝒄𝒂𝒓
│ ${usedPrefix}𝒖𝒏𝒓𝒆𝒈 <𝒏𝒖𝒎𝒆𝒓𝒐 𝒅𝒆 𝒔𝒆𝒓𝒊𝒆>


┌──⭓   𝑯𝑬𝑹𝑨𝑴𝑰𝑬𝑵𝑻𝑨𝑺
│
│ ${usedPrefix}𝒂𝒇𝒌 <𝒎𝒐𝒕𝒊𝒗𝒐>
│ ${usedPrefix}𝒂𝒄𝒐𝒓𝒕𝒂𝒓 <𝒆𝒏𝒍𝒂𝒄𝒆 / 𝒍𝒊𝒏𝒌 / 𝒖𝒓𝒍>
│ ${usedPrefix}𝒄𝒂𝒍𝒄 <𝒐𝒑𝒆𝒓𝒂𝒄𝒊𝒐𝒏 𝒎𝒂𝒕𝒉>
│ ${usedPrefix}𝒅𝒆𝒍 <𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒓𝒆 𝒂 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒅𝒆𝒍 𝑩𝒐𝒕>
│ ${usedPrefix}𝒒𝒓𝒄𝒐𝒅𝒆 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒓𝒆𝒂𝒅𝒎𝒐𝒓𝒆 <𝒕𝒆𝒙𝒕𝒐1| 𝒕𝒆𝒙𝒕𝒐2>
│ ${usedPrefix}𝒔𝒑𝒂𝒎𝒘𝒂 <𝒏𝒖𝒎𝒆𝒓𝒐|𝒕𝒆𝒙𝒕𝒐|𝒄𝒂𝒏𝒕𝒊𝒅𝒂𝒅>
│ ${usedPrefix}𝒔𝒕𝒚𝒍𝒆𝒕𝒆𝒙𝒕 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒕𝒓𝒂𝒅𝒖𝒄𝒊𝒓 <𝒕𝒆𝒙𝒕𝒐>
│
└───────⭓


┌──⭓   𝑨𝑪𝑻𝑰𝑽𝑨𝑹 𝑶 𝑫𝑬𝑺𝑨𝑪𝑻𝑰𝑽𝑨𝑹
│
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒘𝒆𝒍𝒄𝒐𝒎𝒆
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒘𝒆𝒍𝒄𝒐𝒎𝒆
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒎𝒐𝒅𝒐𝒉𝒐𝒓𝒏𝒚
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒎𝒐𝒅𝒐𝒉𝒐𝒓𝒏𝒚
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌2
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌2
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒅𝒆𝒕𝒆𝒄𝒕
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒅𝒆𝒕𝒆𝒄𝒕
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒂𝒖𝒅𝒊𝒐𝒔
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒂𝒖𝒅𝒊𝒐𝒔
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒂𝒖𝒕𝒐𝒔𝒕𝒊𝒄𝒌𝒆𝒓
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒂𝒖𝒕𝒐𝒔𝒕𝒊𝒄𝒌𝒆𝒓
│ ${usedPrefix}sremovebg *<responder a imagen>*
│
└───────⭓


┌──⭓   𝑶𝑾𝑵𝑬𝑹 𝒀 𝑴𝑶𝑫𝑬𝑹𝑨𝑫𝑶𝑹𝑬𝑺
│
│ ${usedPrefix}𝒄𝒂𝒋𝒂𝒇𝒖𝒆𝒓𝒕𝒆
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒓𝒆𝒔𝒕𝒓𝒊𝒄𝒕
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒓𝒆𝒔𝒕𝒓𝒊𝒄𝒕
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒂𝒖𝒕𝒐𝒓𝒆𝒂𝒅
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒂𝒖𝒕𝒐𝒓𝒆𝒂𝒅
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒑𝒖𝒃𝒍𝒊𝒄
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒑𝒖𝒃𝒍𝒊𝒄
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒑𝒄𝒐𝒏𝒍𝒚
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒑𝒄𝒐𝒏𝒍𝒚
│ ${usedPrefix}𝒆𝒏𝒂𝒃𝒍𝒆 𝒈𝒄𝒐𝒏𝒍𝒚
│ ${usedPrefix}𝒅𝒊𝒔𝒂𝒃𝒍𝒆 𝒈𝒄𝒐𝒏𝒍𝒚
│ ${usedPrefix}𝒃𝒂𝒏𝒄𝒉𝒂𝒕
│ ${usedPrefix}𝒖𝒏𝒃𝒂𝒏𝒄𝒉𝒂𝒕
│ ${usedPrefix}𝒃𝒂𝒏𝒖𝒔𝒆𝒓 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒖𝒏𝒃𝒂𝒏𝒖𝒔𝒆𝒓 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒃𝒂𝒏𝒖𝒔𝒆𝒓 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒃𝒄 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒃𝒄𝒄𝒉𝒂𝒕𝒔 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒃𝒄𝒈𝒄 <𝒕𝒆𝒙𝒕𝒐>
│ ${usedPrefix}𝒄𝒍𝒆𝒂𝒓𝒕𝒑𝒎
│ ${usedPrefix}𝒓𝒆𝒔𝒕𝒂𝒓𝒕
│ ${usedPrefix}𝒖𝒑𝒅𝒂𝒕𝒆
│ ${usedPrefix}𝒂𝒅𝒅𝒑𝒓𝒆𝒎 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒅𝒆𝒍𝒑𝒓𝒆𝒎 <@𝒕𝒂𝒈>
│ ${usedPrefix}𝒍𝒊𝒔𝒕𝒑𝒓𝒆𝒎
│
└───────⭓
`.trim()
conn.sendHydrated2(m.chat, str, wm, pp, 'https://www.paypal.me/TheShadowBrokers133', '𝙿𝙰𝚈𝙿𝙰𝙻', 'https://github.com/StevenD-ops/bender-1.git', '𝙶𝙸𝚃𝙷𝚄𝙱', [
[' 𝙳𝙾𝙽𝙰𝚁 ', '.donasi'],
[' 𝙾𝚆𝙽𝙴𝚁 ', '.owner'],
[' 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 ', '.infobot']
], m,)
//await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, {
//type: 'audioMessage',
//ptt: true})
/**<𝔸𝕌𝔻𝕀𝕆𝕊/>*
*- 𝙴𝚂𝙲𝚁𝙸𝙱𝙴 𝙻𝙰𝚂 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴𝚂 𝙿𝙰𝙻𝙰𝙱𝚁𝙰𝚂 𝙾 𝙵𝚁𝙰𝚂𝙴𝚂 𝚂𝙸𝙽 𝙽𝙸𝙽𝙶𝚄𝙽 𝙿𝚁𝙴𝙵𝙸𝙹𝙾 (#, /, *, .)*
_(𝑢𝑠𝑜 𝑠𝑖𝑛 𝑝𝑟𝑒𝑓𝑖𝑗𝑜)_

° ඬ⃟🔊 _Quien es tu sempai botsito 7w7_
° ඬ⃟🔊 _Te diagnostico con gay_
° ඬ⃟🔊 _A nadie le importa_
° ඬ⃟🔊 _Fiesta del admin_
° ඬ⃟🔊 _Fiesta del administrador_
° ඬ⃟🔊 _Vivan los novios_
° ඬ⃟🔊 _Feliz cumpleaños_
° ඬ⃟🔊 _Noche de paz_
° ඬ⃟🔊 _Buenos dias_
° ඬ⃟🔊 _Buenos tardes_
° ඬ⃟🔊 _Buenos noches_
° ඬ⃟🔊 _Audio hentai_
° ඬ⃟🔊 _Chica lgante_
° ඬ⃟🔊 _Feliz navidad_
° ඬ⃟🔊 _Vete a la vrg_
° ඬ⃟🔊 _Pasa pack Bot_
° ඬ⃟🔊 _Atencion grupo_
° ඬ⃟🔊 _Marica quien_
° ඬ⃟🔊 _Murio el grupo_
° ඬ⃟🔊 _Oh me vengo_
° ඬ⃟🔊 _tio que rico_
° ඬ⃟🔊 _Viernes_
° ඬ⃟🔊 _Baneado_
° ඬ⃟🔊 _Sexo_
° ඬ⃟🔊 _Hola_
° ඬ⃟🔊 _Un pato_
° ඬ⃟🔊 _Nyanpasu_
° ඬ⃟🔊 _Te amo_
° ඬ⃟🔊 _Yamete_
° ඬ⃟🔊 _Bañate_
° ඬ⃟🔊 _Es puto_
° ඬ⃟🔊 _La biblia_
° ඬ⃟🔊 _Onichan_
° ඬ⃟🔊 _Mierda de Bot_
° ඬ⃟🔊 _Siuuu_
° ඬ⃟🔊 _Rawr_
° ඬ⃟🔊 _UwU_
° ඬ⃟🔊 _:c_
° ඬ⃟🔊 _a_



*/
} catch (e) {
conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙻 𝙼𝙴𝙽𝚄 𝚃𝙸𝙴𝙽𝙴 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝚈 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙴𝙽𝚅𝙸𝙰𝚁𝙻𝙾, 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝙻𝙾 𝙰𝙻 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃*', m)
throw e
}}
handler.command = /^(menu|menú|memu|memú|help|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos)$/i
handler.exp = 50
handler.fail = null
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

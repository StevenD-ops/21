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
???????????????? ${name} ???????????????????????????????????????? ???? ????????????????????????-????????????

 ????????????????????: ${week}, ${date}
 ???????????????????????? ????????????????????????: ${uptime}
 ????????????????????????????????: ${rtotalreg}

???????????????????????? ???????????????????????????????? ''${usedPrefix}????????????????'' ???????????????? ???????????????????????????? ???????? ??????????????
 ????????????????????????????????????.

???????? ???????????????????????? ???????????????????? ???????? ???????????????????????????? ???????? ???????????? ????????????????????????/????????????????/???????????? ???????????????? ???????????????????? ???????? ???????????????????????? ???? ???????????????????????????????????? ???????? ???????????????????????????????????? ????????????????????
???????? ???????????? ???????? ???????????????????????????? ''${usedPrefix}????????????????????????????''

I??N??F??O??R??M??A??C??I??O??N?? ??D??E?? ??B??E??N??D??E??R??

${usedPrefix}????????????????????????
${usedPrefix}????????????????????????
${usedPrefix}????????????????????????????
${usedPrefix}????????????????????????????????????
${usedPrefix}????????????????????

???????????????? ???????????????????????? ???????????? ???????? ???????????? ???????????????????? ????????????????????????????????
${usedPrefix}???????????? + (????????????????????????????????????????????)

I??N??G??R??E??S??A?? ??A?? ??B??E??N??D??E??R?? ??A?? ??T??U?? ??G??R??U??P??O??

${usedPrefix}???????????????? <???????????????????????? / ???????????????? / ????????????>


R??E??P??O??R??T??E?? ??D??E?? ??F??A??L??L??O??S??

 ${usedPrefix}???????????????????????????? <????????????????????>


????????????  ???????????????? ???????? ??????????????????????????????????????
???
??? ${usedPrefix}???????????????????????????? <???????????????????????????????????? ???? ???????????????????????? ???? ????????????????????>
??? ${usedPrefix}???????????????????????????? <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}???? <???????????????????????????????????? ???? ???????????????????????? ???? ????????????????????>
??? ${usedPrefix}???? <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}???????????????????????????????? <???????????????????? 1>&<???????????????????? 2>
??? ${usedPrefix}???????????????????????????? <???????????????????????????????????? ???? ????????????????????????>
??? ${usedPrefix}???????????????????????? <????????????????> <????????????????????>
??? ${usedPrefix}???????????????? <????????????????????>
??? ${usedPrefix}????????????????2 <????????????????????>
??? ${usedPrefix}???????????? <????????????????????>
??? ${usedPrefix}????????????2 <????????????????????>
??? ${usedPrefix}????????????3 <????????????????????>
??? ${usedPrefix}????????????4 <????????????????????>
??? ${usedPrefix}????????????5 <????????????????????>
??? ${usedPrefix}???????????? <@????????????>
??? ${usedPrefix}???????????????? <@????????????>
??? ${usedPrefix}???????????????? <@????????????>
??? ${usedPrefix}????????????????
??? ${usedPrefix}???????? <????????????????????????????????> <????????????????????????>
??? ${usedPrefix}???????????????????????????????????????????????????? <????????????????????????> <???????????????????????????????????? ???? ????????????????????????>
??? ${usedPrefix}???????????????????????????????????????????????????? <????????????????????????> <???????????????????????????????????? ???? ????????????????????????>
???
???????????????????????????


????????????  ???????????????? ???????? ????????????????????????
??? ${usedPrefix}???????????? <????????????????????????>
??? ${usedPrefix}???????????????? <@????????????>
??? ${usedPrefix}???????????????????? <???????????????????? / ????????????????????????>
??? ${usedPrefix}???????????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????? <@????????????>
??? ???????????????????????? <????????????????????> (???????????? ???????????? ????????????????????????????)
??? ${usedPrefix}???????????????????????? <@????????????>
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
???
???????????????????????????


????????????  ????????????????????????????????????
???
??? ${usedPrefix}????????????????3 <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}????????????????4 <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}????????????????3???????????? <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}????????????????4???????????? <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}????????????????.1 <???????????????????? / ???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}????????????????.2 <???????????????????? / ???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}???????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????>
??? ${usedPrefix}????????????????????????????????2 <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}????????????????????????????????????2 <????????????????????>
???
???????????????????????????


????????????  ????????????????????????????????????????
???
??? ${usedPrefix}???????????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
???
???????????????????????????


????????????  ????????????????????????
???
??? ${usedPrefix}???????????????????? <???????????????? / ???????????????? / ???????????????????????? / ???????????????? / ???????????????????????????? /???????????????????????????????????????? /????????????????????????????????????????2>
??? ${usedPrefix}???????????? <???????????????????? / ???????????????????????? /????????????????????????>
??? ${usedPrefix}???????????????????????????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????????????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}????????????2 <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????????? <???????????????????????? / @????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????? <????????????????????????????>
??? ${usedPrefix}???????????? <@????????????>
??? ${usedPrefix}???????????????? <????????????????????>
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}????????????????????????????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????
???
???????????????????????????


????????????  ????????????????????????????????????????????????????
???
??? ${usedPrefix}???????????????????? <???????????????????????????????? ???? ???????? ????????????????????????????>
??? ${usedPrefix}????????????????3 <???????????????????????????????? ???? ???????? ???????????????????? / ???????????????? ???????? ????????????>
??? ${usedPrefix}???????????????????? <???????????????????????????????? ???? ???????? ???????????????????? / ????????????????????>
??? ${usedPrefix}???????????????????????????? <???????????????????????????????? ???? ???????? ????????????????????>
??? ${usedPrefix}???????????????????? <???????????????????????????????? ???? ???????? ???????????????????? / ???????????????????????? / ????????????????????>
??? ${usedPrefix}???????????? ???????? <????????????????????>
???
???????????????????????????


????????????  ???????????????????????????????????????????????????????? ????????????????????????????????
???
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????
???
???????????????????????????


???????????? ???????????? ???????? +18
???
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????2
??? ${usedPrefix}????????????????3
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????????????????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????2
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????2
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????2
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????????????????
??? ${usedPrefix}????????????????????????????????????
???
???????????????????????????


????????????  ????????????????????????
???
??? ${usedPrefix}????????????????????????????????????????????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}???????????????? <???????????????????????????????????? / ???????????? / ????????????>
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????????????
???
???????????????????????????


????????????  ????????????????????????????
???
??? ${usedPrefix}???????????????????? <????????????????????????> <????????????????????>
??? ${usedPrefix}???????????????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}????????????????????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
???
???????????????????????????

????????????  ???????????????????????????? ???????? ????????????????????????
???   ???????????????????????????????? ???? ????????????????????
???
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????????
???
???????????????????????????


????????????  ????????????????????????????????
???
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}????????????????
??? ${usedPrefix}????????????????????
??? ${usedPrefix}????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}???????????????????????????????? <????????????????> <????????????????????????????????> <@????????????>
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}???????????????????? <???????????????????????? ???????? ????????????????????>


????????????   ????????????????????????????????????????????
???
??? ${usedPrefix}???????????? <????????????????????????>
??? ${usedPrefix}???????????????????????????? <???????????????????????? / ???????????????? / ????????????>
??? ${usedPrefix}???????????????? <???????????????????????????????????? ????????????????>
??? ${usedPrefix}???????????? <???????????????????????????????????? ???? ???????????????????????????? ???????????? ????????????>
??? ${usedPrefix}???????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????1| ????????????????????2>
??? ${usedPrefix}???????????????????????? <????????????????????????|????????????????????|????????????????????????????????>
??? ${usedPrefix}???????????????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????????????????????? <????????????????????>
???
???????????????????????????


????????????   ???????????????????????????? ???? ????????????????????????????????????????
???
??? ${usedPrefix}???????????????????????? ????????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????????????2
??? ${usedPrefix}???????????????????????????? ????????????????????????????????2
??? ${usedPrefix}???????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????????????????????????
??? ${usedPrefix}sremovebg *<responder a imagen>*
???
???????????????????????????


????????????   ???????????????????? ???? ????????????????????????????????????????????
???
??? ${usedPrefix}????????????????????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????? ????????????????????????
??? ${usedPrefix}???????????????????????????? ????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????????????????
??? ${usedPrefix}???????????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????????? <@????????????>
??? ${usedPrefix}???????? <????????????????????>
??? ${usedPrefix}???????????????????????????? <????????????????????>
??? ${usedPrefix}???????????????? <????????????????????>
??? ${usedPrefix}????????????????????????????????
??? ${usedPrefix}????????????????????????????
??? ${usedPrefix}????????????????????????
??? ${usedPrefix}???????????????????????????? <@????????????>
??? ${usedPrefix}???????????????????????????? <@????????????>
??? ${usedPrefix}????????????????????????????????
???
???????????????????????????
`.trim()
conn.sendHydrated2(m.chat, str, wm, pp, 'https://www.paypal.me/TheShadowBrokers133', '????????????????????????', 'https://github.com/StevenD-ops/bender-1.git', '????????????????????????', [
[' ???????????????????? ', '.donasi'],
[' ???????????????????? ', '.owner'],
[' ???????????????????????????? ', '.infobot']
], m,)
//await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, {
//type: 'audioMessage',
//ptt: true})
/**<????????????????????????/>*
*- ???????????????????????????? ???????????? ???????????????????????????????????????? ???????????????????????????????? ???? ???????????????????????? ???????????? ???????????????????????? ???????????????????????????? (#, /, *, .)*
_(???????????? ???????????? ????????????????????????????)_

?? ?????????? _Quien es tu sempai botsito 7w7_
?? ?????????? _Te diagnostico con gay_
?? ?????????? _A nadie le importa_
?? ?????????? _Fiesta del admin_
?? ?????????? _Fiesta del administrador_
?? ?????????? _Vivan los novios_
?? ?????????? _Feliz cumplea??os_
?? ?????????? _Noche de paz_
?? ?????????? _Buenos dias_
?? ?????????? _Buenos tardes_
?? ?????????? _Buenos noches_
?? ?????????? _Audio hentai_
?? ?????????? _Chica lgante_
?? ?????????? _Feliz navidad_
?? ?????????? _Vete a la vrg_
?? ?????????? _Pasa pack Bot_
?? ?????????? _Atencion grupo_
?? ?????????? _Marica quien_
?? ?????????? _Murio el grupo_
?? ?????????? _Oh me vengo_
?? ?????????? _tio que rico_
?? ?????????? _Viernes_
?? ?????????? _Baneado_
?? ?????????? _Sexo_
?? ?????????? _Hola_
?? ?????????? _Un pato_
?? ?????????? _Nyanpasu_
?? ?????????? _Te amo_
?? ?????????? _Yamete_
?? ?????????? _Ba??ate_
?? ?????????? _Es puto_
?? ?????????? _La biblia_
?? ?????????? _Onichan_
?? ?????????? _Mierda de Bot_
?? ?????????? _Siuuu_
?? ?????????? _Rawr_
?? ?????????? _UwU_
?? ?????????? _:c_
?? ?????????? _a_



*/
} catch (e) {
conn.reply(m.chat, '*[??????????????????????] ???????? ???????????????? ???????????????????? ???????? ???????????????????? ???? ???????? ???????????? ???????????????????????????? ????????????????????????????????, ???????????????????????????????????? ???????? ???????????????????????????????????????????? ???????????? ????????????*', m)
throw e
}}
handler.command = /^(menu|men??|memu|mem??|help|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos)$/i
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

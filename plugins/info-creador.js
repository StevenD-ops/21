let handler = async (m, { conn, usedPrefix }) => {
let text = `
*ββ π΄π» π½ππΌπ΄ππΎ π³π΄ πΌπΈ πΎππ½π΄π π΄π wa.me/18299416234*
`
conn.sendMessage(m.chat, { quoted: m })
const data = global.owner.filter(([id, isCreator]) => id && isCreator)
await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator|creador|propietario)$/i
export default handler

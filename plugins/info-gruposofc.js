let media = './Menu2.jpg'
let handler = async (m, { conn, command }) => conn.sendButton(m.chat, `
*Hola ππ» estos son grupos oficiales*

*β€ Grupos oficiales del Bender-Bot:*
*1.-* https://chat.whatsapp.com/HJc1h1JYDgn3eziwogSIXi
`.trim(), wm, media, [['πΈπ π°π» πΌπ΄π½π πΏππΈπ½π²πΈπΏπ°π»', '.menu']], m)
handler.command = /^linkgc|grupos$/i
export default handler

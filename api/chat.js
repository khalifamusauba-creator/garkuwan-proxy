<!DOCTYPE html>
<html lang="ha">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Garkuwan Imrana AI</title>
    <style>
        :root { --p: #075e54; --bg: #f4f4f9; --white: #ffffff; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); margin: 0; display: flex; height: 100vh; overflow: hidden; }
        .sidebar { width: 0; background: #202123; color: white; transition: 0.3s; overflow-x: hidden; display: flex; flex-direction: column; z-index: 1000; }
        .sidebar.active { width: 260px; }
        .sidebar-header { padding: 20px; font-weight: bold; border-bottom: 1px solid #444; }
        .history-list { flex: 1; padding: 15px; font-size: 14px; color: #ccc; }
.main-chat { flex: 1; display: flex; flex-direction: column; background: var(--bg); position: relative; }
        .header { background: var(--white); padding: 12px 15px; display: flex; align-items: center; border-bottom: 1px solid #ddd; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .menu-btn { font-size: 26px; cursor: pointer; color: #555; margin-right: 15px; }
        #chat { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; }
        .msg { max-width: 80%; padding: 12px 16px; border-radius: 18px; font-size: 15px; line-height: 1.5; }
        .u { align-self: flex-end; background: #007bff; color: white; border-bottom-right-radius: 2px; }
        .a { align-self: flex-start; background: white; color: #333; border-bottom-left-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }.input-container { padding: 15px; background: var(--bg); }
        .input-box { background: white; border-radius: 30px; display: flex; align-items: center; padding: 5px 15px; border: 1px solid #ddd; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .plus-btn { font-size: 28px; color: #666; cursor: pointer; margin-right: 10px; display: flex; align-items: center; }
        .model-select { border: none; outline: none; background: #f0f0f0; border-radius: 15px; padding: 5px 10px; font-size: 12px; margin: 0 10px; color: #555; }
        input[type="text"] { flex: 1; border: none; outline: none; padding: 10px; font-size: 16px; background: transparent; }
        .send-btn { color: #007bff; font-size: 24px; cursor: pointer; background: none; border: none; padding: 5px; }
    </style>
</head><body>
<div class="sidebar" id="sidebar">
    <div class="sidebar-header">Tarihin Hira</div>
    <div class="history-list" id="history">Babu tarihin hira tukunna...</div>
</div>
<div class="main-chat">
    <div class="header">
        <div class="menu-btn" onclick="toggleSidebar()">☰</div>
        <div style="font-weight: bold; font-size: 18px; color: #333;">Garkuwan AI</div>
    </div>
    <div id="chat">
        <div class="msg a">Barka da zuwa! Ni ne Garkuwan Imrana. Ta yaya zan taimake ka?</div>
    </div>
    <div class="input-container">
        <div class="input-box">
            <label class="plus-btn" for="f">+</label>
            <input type="file" id="f" style="display:none" onchange="previewFile()">
            <select class="model-select"><option>Fast</option></select>
            <input type="text" id="t" placeholder="Rubuta sakon ka...">
            <button class="send-btn" onclick="ask()">➤</button>
        </div>
    </div>
</div><script>
    let b64 = ""; let mime = "";
    function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }
    
    function previewFile() {
        const file = document.getElementById('f').files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            b64 = reader.result.split(',')[1]; mime = file.type;
            document.getElementById('chat').innerHTML += `<div class="msg u">📄 An zaba: ${file.name}</div>`;
        };
        if (file) reader.readAsDataURL(file);
    }

    async function ask() {
        const i = document.getElementById('t'); const b = document.getElementById('chat');
        const txt = i.value.trim(); if (!txt && !b64) return;
        b.innerHTML += `<div class="msg u">${txt}</div>`; i.value = "";
        b.scrollTop = b.scrollHeight;
        try {
            const res = await fetch('https://garkuwan-proxy-tc2p.vercel.app/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: txt, image: b64, mimeType: mime })
            });
            const data = await res.json();
            b.innerHTML += `<div class="msg a">${data.reply || "Error!"}</div>`;
            b64 = ""; mime = "";
        } catch (e) { b.innerHTML += `<div class="msg a">Network Error! Duba Vercel dinka.</div>`; }
        b.scrollTop = b.scrollHeight;
    }
</script>
</body>
</html>

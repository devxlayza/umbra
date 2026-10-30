// @ts-nocheck — lógica ainda imperativa, portada do protótipo estático (próximo passo: refatorar em componentes e hooks).
import { useEffect, useRef } from "react";

const HTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="xh" viewBox="0 0 400 400"><circle cx="200" cy="200" r="190"/><circle cx="200" cy="200" r="104"/><path d="M200 96v208M96 200h208M330 70L70 330M30 60h10M35 55v10M360 340h10M365 335v10"/></symbol></svg>
<div class="ann"><div class="wrap"><span class="meta">Frete grátis acima de R$ 499</span><span class="meta mut">Edição numerada · 250 peças</span><button class="lnk" id="demo" type="button">Demo: abrir agora</button></div></div>
<header><div class="wrap"><nav class="meta"><a href="#cat">Modelos</a><a href="#cat">Coleção</a><a href="#sobre">Sobre</a></nav><div class="logo">UMBRA<sup>®</sup></div><div class="hr"><button class="btn" id="th" type="button">Tema</button><button class="btn" id="bag" type="button" aria-haspopup="dialog">Sacola (<span id="cnt">0</span>)</button></div></div></header>
<main>
<div class="wrap">
<section class="hero" id="hero" aria-label="Drop 01">
  <div class="ht"><div class="meta">Umbra® — Vision Object Series<br>Dark Lens Study / Drop 01<br>Arquivo ID: 930 · 28</div><div class="meta">Edição limitada · 2026<br>Fuso: BRT (UTC−3)</div></div>
  <svg class="cross" viewBox="0 0 400 400" aria-hidden="true"><use href="#xh"/></svg>
  <div><div class="title">UMBRA<sup>®</sup></div>
    <div class="cd" role="timer" aria-label="Contagem regressiva para o drop"><div><b class="cdn">00</b><span class="meta">Dias</span></div><div><b class="cdn">00</b><span class="meta">Horas</span></div><div><b class="cdn">00</b><span class="meta">Min</span></div><div><b class="cdn">00</b><span class="meta">Seg</span></div></div></div>
  <div class="cta"><button class="btn solid" id="cta" type="button" aria-disabled="true">Aguardando abertura</button><div><div class="meta" id="qs" aria-live="polite"></div><div class="pb"><i id="qp"></i></div></div></div>
  <p class="hb">Umbra® é uma casa de óculos escuros que trabalha com pouca luz: armações de acetato preto, lentes escuras e edição numerada. O Drop 01 reúne 250 peças, abre uma vez e não volta. Quem chega em silêncio, leva.</p>
</section>
</div>
<section class="band" aria-label="Detalhes do drop">  <div class="k"><span class="meta">Unidades numeradas</span><b>250</b></div><div class="k"><span class="meta">Reserva da sacola</span><b>05:00</b></div><div class="k"><span class="meta">Sem juros</span><b>12x</b></div><div class="k"><span class="meta">Troca grátis</span><b>30D</b></div></section>
<div class="wrap">
<section class="sec" id="cat"><div class="sh"><h2>Melhores<br>do drop</h2><span class="meta mut">04 modelos · estoque ao vivo</span></div><div class="grid" id="grid"></div></section>
</div>
<section class="dark" id="sobre"><div class="wrap"><span class="meta mut">Nova temporada</span><h2>Dark lens<br>study.</h2><p>Lentes escuras não escondem: elas filtram. Cada armação é cortada para guardar o olhar e afiar a silhueta.</p><a class="lnk" href="#cat" style="color:#ecece8">Explorar coleção →</a></div></section>
<div class="wrap"><footer class="ft"><span class="meta mut">Umbra® — loja fictícia · projeto de portfólio · dados simulados no navegador</span><p>Fila virtual, estoque em tempo real e reserva da sacola são simulados localmente para demonstrar o fluxo de um lançamento de alto tráfego.</p></footer></div>
</main>
<div id="dlg"><div class="ov" id="ov"></div>
<aside class="dr" role="dialog" aria-modal="true" aria-label="Sacola" aria-hidden="true"><div class="dh"><span class="meta">Sacola · <span id="rt">sem reserva</span></span><button class="btn" id="cl" type="button">Fechar</button></div><div id="items"></div><div class="tot"><span>Total</span><span id="tt">R$ 0</span></div><button class="btn solid" id="ck" type="button">Finalizar reserva</button></aside></div>`;

function init(host: HTMLElement): () => void {
  const __t: number[] = [];
  const __l: [string, any][] = [];
  const __every = (f: any, ms: number) => {
    __t.push(window.setInterval(f, ms));
  };
  const __on = (ev: string, f: any) => {
    document.addEventListener(ev, f);
    __l.push([ev, f]);
  };
  const $ = (s) => host.querySelector(s),
    $$ = (s) => [...host.querySelectorAll(s)],
    root = host;
  const BRL = (v) =>
    v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });
  const P = [
    { id: 1, n: "Kyro", f: "Retangular", p: 689, s: 70, t: 70, sh: "rect" },
    { id: 2, n: "Arc", f: "Wrap", p: 729, s: 60, t: 60, sh: "wrap" },
    { id: 3, n: "Frame-X", f: "Shield", p: 849, s: 50, t: 50, sh: "shield" },
    { id: 4, n: "V/01", f: "Slim", p: 639, s: 70, t: 70, sh: "slim" },
  ];
  const cart = {};
  let DROP = Date.now() + 45000,
    acc = "none",
    pos = 0,
    pos0 = 1,
    resAt = 0,
    done = null,
    iv = null;
  const open = () => Date.now() >= DROP;
  function svg(p) {
    let L;
    if (p.sh === "shield")
      L = '<rect x="14" y="20" width="172" height="38" rx="16"/>';
    else {
      const w = p.sh === "rect" ? 76 : p.sh === "wrap" ? 80 : 64,
        h = p.sh === "rect" ? 36 : p.sh === "wrap" ? 34 : 26,
        rx = p.sh === "rect" ? 5 : p.sh === "wrap" ? 18 : 10,
        y = p.sh === "slim" ? 26 : 20;
      L = `<rect x="${94 - w}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect x="106" y="${y}" width="${w}" height="${h}" rx="${rx}"/><path d="M94 ${y + 8}h12" stroke="#cfcfca" stroke-width="2.5" fill="none"/>`;
    }
    return `<svg viewBox="0 0 200 80" role="img" aria-label="Óculos ${p.n}"><defs><linearGradient id="g${p.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#454850"/><stop offset=".5" stop-color="#0b0c0e"/><stop offset="1" stop-color="#1d1f23"/></linearGradient></defs><ellipse cx="100" cy="70" rx="72" ry="4" fill="rgba(0,0,0,.35)"/><g fill="url(#g${p.id})" stroke="#d9d9d4" stroke-width="2">${L}</g></svg>`;
  }
  function grid() {
    $("#grid").innerHTML = P.map((p) => {
      const out = p.s <= 0,
        lo = p.s > 0 && p.s <= 12;
      let lb,
        dis = false,
        act = "add";
      if (out) {
        lb = "Esgotado";
        dis = true;
      } else if (!open()) {
        lb = "Em breve";
        dis = true;
      } else if (acc === "none") {
        lb = "Entre na fila";
        act = "join";
      } else if (acc === "queue") {
        lb = "Na fila…";
        dis = true;
      } else lb = "Adicionar · " + BRL(p.p);
      return `<article class="card ${out ? "out" : ""}"><div class="tile">${svg(p)}</div><div class="row"><b>${p.n}</b><span class="meta">${BRL(p.p)}</span></div><div class="row"><span class="meta mut">${p.f}</span><span class="meta ${lo ? "low" : "mut"}">${out ? "Esgotado" : "Restam " + p.s}</span></div><div class="bar"><i style="width:${(p.s / p.t) * 100}%"></i></div><button class="btn ${acc === "granted" && !out ? "solid" : ""}" type="button" data-a="${act}" data-id="${p.id}" ${dis ? 'aria-disabled="true"' : ""}>${lb}</button></article>`;
    }).join("");
  }
  function mmss(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    return (
      String(Math.floor(s / 60)).padStart(2, "0") +
      ":" +
      String(s % 60).padStart(2, "0")
    );
  }
  function status() {
    const q = $("#qs"),
      b = $("#cta"),
      f = $("#qp");
    let t = "",
      l = "",
      d = false;
    if (!open()) {
      t = "Abertura em instantes · fique nesta página";
      l = "Aguardando abertura";
      d = true;
      f.style.width = "0";
    } else if (acc === "none") {
      t = "Drop aberto · entre na fila para liberar a compra";
      l = "Entrar na fila";
      f.style.width = "0";
    } else if (acc === "queue") {
      t = `Posição ${Math.max(pos, 1)} na fila · liberando acesso`;
      l = "Na fila…";
      d = true;
      f.style.width = Math.min(100, (1 - pos / pos0) * 100) + "%";
    } else {
      t = `Acesso liberado · reserva expira em ${mmss(resAt - Date.now())}`;
      l = "Ir para a coleção";
      f.style.width = "100%";
    }
    q.textContent = t;
    b.textContent = l;
    b.setAttribute("aria-disabled", d);
  }
  function join() {
    if (acc !== "none" || !open()) return;
    acc = "queue";
    pos0 = pos = 90 + Math.floor(Math.random() * 60);
    iv = __every(() => {
      pos -= 3 + Math.floor(Math.random() * 7);
      if (pos <= 0) {
        clearInterval(iv);
        acc = "granted";
        resAt = Date.now() + 300000;
        grid();
      }
      status();
    }, 320);
    grid();
    status();
  }
  function expire() {
    Object.keys(cart).forEach((id) => {
      P.find((p) => p.id == id).s += cart[id];
      delete cart[id];
    });
    acc = "none";
    grid();
    bagUI();
    status();
    $("#qs").textContent = "Reserva expirada · entre na fila novamente";
  }
  function bagUI() {
    const ids = Object.keys(cart),
      n = ids.reduce((a, i) => a + cart[i], 0);
    $("#cnt").textContent = n;
    let tot = 0;
    $("#items").innerHTML = done
      ? `<p class="meta" style="padding:20px 0">Reserva confirmada ✦<br><br>Pedido ${done}<br>Enviamos os detalhes por e-mail.</p>`
      : ids.length
        ? ids
            .map((i) => {
              const p = P.find((x) => x.id == i);
              tot += p.p * cart[i];
              return `<div class="it"><div><b>${p.n}</b><div class="meta mut">${p.f}</div></div><span>${BRL(p.p * cart[i])}</span><div class="qt"><button type="button" data-a="dec" data-id="${i}" aria-label="Diminuir ${p.n}">−</button>${cart[i]}<button type="button" data-a="inc" data-id="${i}" aria-label="Aumentar ${p.n}">+</button></div></div>`;
            })
            .join("")
        : '<p class="meta mut" style="padding:20px 0">Sua sacola está vazia.</p>';
    $("#tt").textContent = BRL(tot);
    $("#ck").setAttribute("aria-disabled", !ids.length);
  }
  function add(id) {
    const p = P.find((x) => x.id == id);
    if (acc !== "granted" || p.s < 1) return;
    p.s--;
    cart[id] = (cart[id] || 0) + 1;
    done = null;
    grid();
    bagUI();
  }
  function dec(id) {
    if (!cart[id]) return;
    cart[id]--;
    P.find((p) => p.id == id).s++;
    if (!cart[id]) delete cart[id];
    grid();
    bagUI();
  }
  __on("click", (e) => {
    const t = e.target.closest("[data-a]");
    if (!t || t.getAttribute("aria-disabled") === "true") return;
    const a = t.dataset.a,
      id = t.dataset.id;
    if (a === "join") {
      join();
      $("#hero").scrollIntoView();
    }
    if (a === "add" || a === "inc") add(id);
    if (a === "dec") dec(id);
  });
  $("#cta").onclick = () => {
    if ($("#cta").getAttribute("aria-disabled") === "true") return;
    acc === "none" ? join() : $("#cat").scrollIntoView();
  };
  $("#demo").onclick = () => {
    DROP = Date.now();
    grid();
    status();
  };
  const dlg = $("#dlg"),
    dr = $(".dr");
  function sheet(o) {
    dlg.classList.toggle("open", o);
    dr.setAttribute("aria-hidden", !o);
    if (o) $("#cl").focus();
    else $("#bag").focus();
  }
  $("#bag").onclick = () => sheet(true);
  $("#cl").onclick = () => sheet(false);
  $("#ov").onclick = () => sheet(false);
  __on("keydown", (e) => {
    if (e.key === "Escape" && dlg.classList.contains("open")) sheet(false);
  });
  $("#ck").onclick = () => {
    if ($("#ck").getAttribute("aria-disabled") === "true") return;
    Object.keys(cart).forEach((i) => delete cart[i]);
    done = "#UMB-" + Math.floor(1000 + Math.random() * 9000);
    bagUI();
  };
  $("#th").onclick = () => {
    const dk = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
    root.dataset.theme = dk ? "light" : "dark";
  };
  let was = false;
  __every(() => {
    const d = Math.max(0, DROP - Date.now()),
      s = Math.floor(d / 1000),
      v = [
        Math.floor(s / 86400),
        Math.floor((s % 86400) / 3600),
        Math.floor((s % 3600) / 60),
        s % 60,
      ];
    $$(".cdn").forEach(
      (el, i) => (el.textContent = String(v[i]).padStart(2, "0")),
    );
    if (open() && !was) {
      was = true;
      grid();
    }
    if (acc === "granted") {
      if (resAt - Date.now() <= 0) expire();
      else {
        status();
        $("#rt").textContent = "reserva " + mmss(resAt - Date.now());
      }
    } else $("#rt").textContent = "sem reserva";
  }, 250);
  __every(() => {
    if (!open()) return;
    const c = P.filter((p) => p.s > 0);
    if (!c.length) return;
    const p = c[Math.floor(Math.random() * c.length)];
    p.s = Math.max(0, p.s - 1);
    grid();
  }, 2600);
  grid();
  bagUI();
  status();
  return () => {
    __t.forEach((i) => clearInterval(i));
    __l.forEach(([e, f]) => document.removeEventListener(e, f));
  };
}

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.title = "Umbra — Loja editorial + drop";
    el.innerHTML = HTML;
    return init(el);
  }, []);
  return <div ref={ref} className="umbra" />;
}

/* =====================================================
   VISITA UTI PED — V2.0
   ===================================================== */
/* ELEMENTOS */
const ficha =
    document.getElementById("ficha");
const leitoSelecionado =
    document.getElementById("leitoSelecionado");
const botoesLeito =
    document.querySelectorAll(".leito");
const botoesSuporte =
    document.querySelectorAll(".support-button");
const o2Fields =
    document.getElementById("o2Fields");
const vniFields =
    document.getElementById("vniFields");
const vmFields =
    document.getElementById("vmFields");
const peso =
    document.getElementById("peso");
const vt =
    document.getElementById("vt");
const vtKg =
    document.getElementById("vtKg");
const medicacoes =
    document.getElementById("medicacoes");
const adicionarMedicacao =
    document.getElementById("adicionarMedicacao");
const medicacaoForm =
    document.getElementById("medicacaoForm");
const confirmarMedicacao =
    document.getElementById("confirmarMedicacao");
const medicamentoVisita =
    document.getElementById("medicamentoVisita");
const vazaoMedicacao =
    document.getElementById("vazaoMedicacao");
const doseMedicacao =
    document.getElementById("doseMedicacao");
const salvar =
    document.getElementById("salvar");
/* =====================================================
   SELECIONAR LEITO
   ===================================================== */
botoesLeito.forEach(
    function(botao) {
        botao.addEventListener(
            "click",
            function() {
                botoesLeito.forEach(
                    function(item) {
                        item.classList.remove(
                            "active"
                        );
                    }
                );
                this.classList.add(
                    "active"
                );
                const leito =
                    this.dataset.leito;
                leitoSelecionado.textContent =
                    leito;
                ficha.classList.remove(
                    "hidden"
                );
                window.scrollTo({
                    top: ficha.offsetTop - 10,
                    behavior: "smooth"
                });
            }
        );
    }
);
/* =====================================================
   SUPORTE RESPIRATÓRIO
   ===================================================== */
botoesSuporte.forEach(
    function(botao) {
        botao.addEventListener(
            "click",
            function() {
                botoesSuporte.forEach(
                    function(item) {
                        item.classList.remove(
                            "active"
                        );
                    }
                );
                this.classList.add(
                    "active"
                );
                o2Fields.classList.add(
                    "hidden"
                );
                vniFields.classList.add(
                    "hidden"
                );
                vmFields.classList.add(
                    "hidden"
                );
                const suporte =
                    this.dataset.support;
                if (suporte === "o2") {
                    o2Fields.classList.remove(
                        "hidden"
                    );
                }
                if (suporte === "vni") {
                    vniFields.classList.remove(
                        "hidden"
                    );
                }
                if (suporte === "vm") {
                    vmFields.classList.remove(
                        "hidden"
                    );
                }
            }
        );
    }
);
/* =====================================================
   VT/KG AUTOMÁTICO
   ===================================================== */
function calcularVtKg() {
    const pesoValor =
        Number(
            String(peso.value)
                .replace(",", ".")
        );
    const vtValor =
        Number(
            String(vt.value)
                .replace(",", ".")
        );
    if (
        Number.isFinite(pesoValor) &&
        pesoValor > 0 &&
        Number.isFinite(vtValor) &&
        vtValor > 0
    ) {
        const resultado =
            vtValor / pesoValor;
        vtKg.value =
            resultado
                .toFixed(1)
                .replace(".", ",");
    } else {
        vtKg.value = "";
    }
}
peso.addEventListener(
    "input",
    calcularVtKg
);
vt.addEventListener(
    "input",
    calcularVtKg
);
/* =====================================================
   ADICIONAR MEDICAÇÃO
   ===================================================== */
adicionarMedicacao.addEventListener(
    "click",
    function() {
        medicacaoForm.classList.toggle(
            "hidden"
        );
    }
);
/* =====================================================
   CONFIRMAR MEDICAÇÃO
   ===================================================== */
confirmarMedicacao.addEventListener(
    "click",
    function() {
        const nome =
            medicamentoVisita.value;
        const vazao =
            vazaoMedicacao.value;
        const dose =
            doseMedicacao.value;
        if (!nome) {
            alert(
                "Selecione o medicamento."
            );
            return;
        }
        const item =
            document.createElement("div");
        item.className =
            "medication-item";
        item.innerHTML = `
            <strong>${nome}</strong>
            <span>
                ${vazao || "-"} mL/h
                &nbsp; • &nbsp;
                ${dose || "-"}
            </span>
        `;
        medicacoes
            .querySelector(".empty")
            ?.remove();
        medicacoes.appendChild(
            item
        );
        medicamentoVisita.value = "";
        vazaoMedicacao.value = "";
        doseMedicacao.value = "";
        medicacaoForm.classList.add(
            "hidden"
        );
    }
);
/* =====================================================
   SALVAR
   ===================================================== */
salvar.addEventListener(
    "click",
    function() {
        const leito =
            leitoSelecionado.textContent;
        alert(
            `Avaliação do Leito ${leito} registrada nesta sessão.`
        );
    }
);

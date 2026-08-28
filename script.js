/* =====================================================
   CALCULADORA UTI PED — V1.3
   ===================================================== */


/* =====================================================
   MEDICAMENTOS
   ===================================================== */

const medicamentos = {

    noradrenalina: {
        nome: "Noradrenalina",
        concentracaoMcgMl: 1000,
        apresentacao: "1 mg/mL",
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },

    adrenalina: {
        nome: "Adrenalina",
        concentracaoMcgMl: 1000,
        apresentacao: "1 mg/mL",
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },

    dopamina: {
        nome: "Dopamina",
        concentracaoMcgMl: 5000,
        apresentacao: "5 mg/mL",
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },

    dobutamina: {
        nome: "Dobutamina",
        concentracaoMcgMl: 12500,
        apresentacao: "12,5 mg/mL",
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },

    fentanil: {
        nome: "Fentanil",
        concentracaoMcgMl: 50,
        apresentacao: "50 µg/mL",
        unidadeDose: "µg/kg/h",
        tipoDose: "mcgkgh"
    },

    midazolam: {
        nome: "Midazolam",
        concentracaoMcgMl: 5000,
        apresentacao: "5 mg/mL",
        unidadeDose: "mg/kg/h",
        tipoDose: "mgkgh"
    },

    dexmedetomidina: {
        nome: "Dexmedetomidina",
        concentracaoMcgMl: 100,
        apresentacao: "100 µg/mL",
        unidadeDose: "µg/kg/h",
        tipoDose: "mcgkgh"
    },

    milrinona: {
        nome: "Milrinona",
        concentracaoMcgMl: 1000,
        apresentacao: "1 mg/mL",
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },

    rocuronio: {
        nome: "Rocurônio",
        concentracaoMcgMl: 10,
        apresentacao: "10 µg/mL",
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    }

};


/* =====================================================
   FUNÇÃO PARA PEGAR ELEMENTOS
   ===================================================== */

function elemento(id) {
    return document.getElementById(id);
}


/* =====================================================
   ELEMENTOS DA CALCULADORA
   ===================================================== */

const medicamentoSelect = elemento("medicamento");
const concentracaoBox = elemento("concentracaoBox");
const concentracao = elemento("concentracao");

const volumeMedicamento =
    elemento("volumeMedicamento");

const volumeDiluente =
    elemento("volumeDiluente");

const calcular =
    elemento("calcular");

const resultado =
    elemento("resultado");

const erro =
    elemento("erro");

const mensagemErro =
    elemento("mensagemErro");

const resultadoMedicamento =
    elemento("resultadoMedicamento");

const dose =
    elemento("dose");

const unidadeDose =
    elemento("unidadeDose");

const concentracaoFinal =
    elemento("concentracaoFinal");

const resultadoVazao =
    elemento("resultadoVazao");

const adicionarAoLeito =
    elemento("adicionarAoLeito");

const leitoSelecionado =
    elemento("leitoSelecionado");

/* =====================================================
   ABAS
   ===================================================== */

const tabCalculadora =
    elemento("tabCalculadora");

const tabLeitos =
    elemento("tabLeitos");

const tabSinaisVitais =
    elemento("tabSinaisVitais");


const paginaCalculadora =
    elemento("paginaCalculadora");

const paginaLeitos =
    elemento("paginaLeitos");

const paginaSinaisVitais =
    elemento("paginaSinaisVitais");


/* =========================
   CALCULADORA
========================= */

if (tabCalculadora) {

    tabCalculadora.addEventListener(
        "click",
        function() {

            tabCalculadora.classList.add("active");

            tabLeitos.classList.remove("active");

            tabSinaisVitais.classList.remove("active");


            paginaCalculadora.classList.remove("hidden");

            paginaLeitos.classList.add("hidden");

            paginaSinaisVitais.classList.add("hidden");

        }
    );

}


/* =========================
   LEITOS
========================= */

if (tabLeitos) {

    tabLeitos.addEventListener(
        "click",
        function() {

            tabLeitos.classList.add("active");

            tabCalculadora.classList.remove("active");

            tabSinaisVitais.classList.remove("active");


            paginaLeitos.classList.remove("hidden");

            paginaCalculadora.classList.add("hidden");

            paginaSinaisVitais.classList.add("hidden");


            atualizarBotoesLeitos();

        }
    );

}


/* =========================
   SINAIS VITAIS
========================= */

if (tabSinaisVitais) {

    tabSinaisVitais.addEventListener(
        "click",
        function() {

            tabSinaisVitais.classList.add("active");

            tabCalculadora.classList.remove("active");

            tabLeitos.classList.remove("active");


            paginaSinaisVitais.classList.remove("hidden");

            paginaCalculadora.classList.add("hidden");

            paginaLeitos.classList.add("hidden");

        }
    );

}

/* =====================================================
   CONVERSÃO
   ===================================================== */

function obterNumero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {

        return NaN;

    }

    return Number(
        String(valor).replace(",", ".")
    );

}


/* =====================================================
   FORMATAÇÃO
   ===================================================== */

function formatarNumero(valor) {

    if (!Number.isFinite(valor)) {
        return "-";
    }

    return valor.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3
        }
    );

}


/* =====================================================
   ERRO
   ===================================================== */

function mostrarErro(texto) {

    if (mensagemErro) {
        mensagemErro.textContent = texto;
    }

    if (erro) {
        erro.classList.remove("hidden");
    }

    if (resultado) {
        resultado.classList.add("hidden");
    }

}


/* =====================================================
   MEDICAMENTO
   ===================================================== */

if (medicamentoSelect) {

    medicamentoSelect.addEventListener(
        "change",
        function() {

            const medicamento =
                medicamentos[this.value];

            if (resultado) {
                resultado.classList.add("hidden");
            }

            if (erro) {
                erro.classList.add("hidden");
            }

            if (!medicamento) {

                if (concentracaoBox) {
                    concentracaoBox.classList.add("hidden");
                }

                return;

            }

            if (concentracao) {
                concentracao.textContent =
                    medicamento.apresentacao;
            }

            if (concentracaoBox) {
                concentracaoBox.classList.remove("hidden");
            }

        }
    );

}


/* =====================================================
   ÚLTIMO RESULTADO
   ===================================================== */

let ultimoResultado = null;


/* =====================================================
   CALCULAR DOSE
   ===================================================== */

if (calcular) {

    calcular.addEventListener(
        "click",
        function() {

            if (erro) {
                erro.classList.add("hidden");
            }

            if (resultado) {
                resultado.classList.add("hidden");
            }


            const medicamentoSelecionado =
                medicamentoSelect.value;


            const peso =
                obterNumero(
                    elemento("peso").value
                );


            const volumeDroga =
                obterNumero(
                    volumeMedicamento.value
                );


            const volumeDiluenteValue =
                obterNumero(
                    volumeDiluente.value
                );


            const vazao =
                obterNumero(
                    elemento("vazao").value
                );


            /* =============================
               VALIDAÇÕES
            ============================= */

            if (!medicamentoSelecionado) {

                mostrarErro(
                    "Selecione o medicamento."
                );

                return;

            }


            if (
                !Number.isFinite(peso) ||
                peso <= 0
            ) {

                mostrarErro(
                    "Informe um peso válido."
                );

                return;

            }


            if (
                !Number.isFinite(volumeDroga) ||
                volumeDroga <= 0
            ) {

                mostrarErro(
                    "Informe o volume do medicamento."
                );

                return;

            }


            if (
                !Number.isFinite(volumeDiluenteValue) ||
                volumeDiluenteValue < 0
            ) {

                mostrarErro(
                    "Informe o volume do diluente."
                );

                return;

            }


            if (
                !Number.isFinite(vazao) ||
                vazao <= 0
            ) {

                mostrarErro(
                    "Informe uma vazão válida."
                );

                return;

            }


            const medicamento =
                medicamentos[
                    medicamentoSelecionado
                ];


            /* =============================
               VOLUME FINAL
            ============================= */

            const volumeTotal =
                volumeDroga +
                volumeDiluenteValue;


            if (volumeTotal <= 0) {

                mostrarErro(
                    "O volume final deve ser maior que zero."
                );

                return;

            }


            /* =============================
               QUANTIDADE TOTAL
            ============================= */

            const quantidadeTotalMcg =
                medicamento.concentracaoMcgMl *
                volumeDroga;


            /* =============================
               CONCENTRAÇÃO FINAL
            ============================= */

            const concentracaoMcgMl =
                quantidadeTotalMcg /
                volumeTotal;


            /* =============================
               QUANTIDADE POR HORA
            ============================= */

            const quantidadePorHoraMcg =
                concentracaoMcgMl *
                vazao;


            let doseCalculada;


            /* =============================
               µg/kg/min
            ============================= */

            if (
                medicamento.tipoDose ===
                "mcgkgmin"
            ) {

                doseCalculada =
                    quantidadePorHoraMcg /
                    peso /
                    60;

            }


            /* =============================
               µg/kg/h
            ============================= */

            else if (
                medicamento.tipoDose ===
                "mcgkgh"
            ) {

                doseCalculada =
                    quantidadePorHoraMcg /
                    peso;

            }


            /* =============================
               mg/kg/h
            ============================= */

            else if (
                medicamento.tipoDose ===
                "mgkgh"
            ) {

                const quantidadePorHoraMg =
                    quantidadePorHoraMcg /
                    1000;

                doseCalculada =
                    quantidadePorHoraMg /
                    peso;

            }


            /* =============================
               GUARDAR RESULTADO
            ============================= */

            ultimoResultado = {

                medicamentoKey:
                    medicamentoSelecionado,

                nome:
                    medicamento.nome,

                apresentacao:
                    medicamento.apresentacao,

                dose:
                    doseCalculada,

                unidadeDose:
                    medicamento.unidadeDose,

                vazao:
                    vazao,

                volumeMedicamento:
                    volumeDroga,

                volumeDiluente:
                    volumeDiluenteValue,

                volumeFinal:
                    volumeTotal,

                peso:
                    peso

            };


            /* =============================
               MOSTRAR RESULTADO
            ============================= */

            if (resultadoMedicamento) {

                resultadoMedicamento.textContent =
                    medicamento.nome;

            }


            if (dose) {

                dose.textContent =
                    formatarNumero(
                        doseCalculada
                    );

            }


            if (unidadeDose) {

                unidadeDose.textContent =
                    medicamento.unidadeDose;

            }


            if (concentracaoFinal) {

                concentracaoFinal.textContent =
                    `${formatarNumero(volumeTotal)} mL`;

            }


            if (resultadoVazao) {

                resultadoVazao.textContent =
                    `${formatarNumero(vazao)} mL/h`;

            }


            if (resultado) {

                resultado.classList.remove("hidden");

                resultado.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );

}


/* =====================================================
   SISTEMA DE LEITOS
   ===================================================== */

let leitos = {};

try {

    leitos =
        JSON.parse(
            localStorage.getItem(
                "calculadoraUTIPED_leitos"
            )
        ) || {};

} catch (e) {

    leitos = {};

}


let leitoAtual = null;


const painelLeito =
    elemento("painelLeito");

const leitoAtualElemento =
    elemento("leitoAtual");

const pesoLeito =
    elemento("pesoLeito");

const listaMedicacoes =
    elemento("listaMedicacoes");

const botoesLeito =
    document.querySelectorAll(
        ".leito-button"
    );

const salvarLeito =
    elemento("salvarLeito");

const resetLeito =
    elemento("resetLeito");


/* =====================================================
   SALVAR NO NAVEGADOR
   ===================================================== */

function salvarDados() {

    localStorage.setItem(
        "calculadoraUTIPED_leitos",
        JSON.stringify(leitos)
    );

}


/* =====================================================
   SELECIONAR LEITO
   ===================================================== */

botoesLeito.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                selecionarLeito(
                    this.dataset.leito
                );

            }
        );

    }
);


function selecionarLeito(numero) {

    leitoAtual =
        String(numero);


    if (!leitos[leitoAtual]) {

        leitos[leitoAtual] = {

            peso: "",

            medicacoes: []

        };

        salvarDados();

    }


    if (leitoAtualElemento) {

        leitoAtualElemento.textContent =
            leitoAtual;

    }


    if (pesoLeito) {

        pesoLeito.value =
            leitos[leitoAtual].peso || "";

    }


    if (painelLeito) {

        painelLeito.classList.remove("hidden");

    }


    botoesLeito.forEach(
        function(botao) {

            botao.classList.toggle(
                "active",
                botao.dataset.leito === leitoAtual
            );

        }
    );


    mostrarMedicacoes();

}


/* =====================================================
   MOSTRAR MEDICAÇÕES
   ===================================================== */

function mostrarMedicacoes() {

    if (!listaMedicacoes) {
        return;
    }


    listaMedicacoes.innerHTML = "";


    if (
        !leitoAtual ||
        !leitos[leitoAtual] ||
        !Array.isArray(
            leitos[leitoAtual].medicacoes
        ) ||
        leitos[leitoAtual].medicacoes.length === 0
    ) {

        listaMedicacoes.innerHTML = `
            <p class="empty-medications">
                Nenhuma medicação adicionada.
            </p>
        `;

        return;

    }


    leitos[leitoAtual]
        .medicacoes
        .forEach(
            function(medicacao, index) {

                const item =
                    document.createElement("div");

                item.className =
                    "medication-card";


                item.innerHTML = `

                    <div class="medication-name">
                        ${medicacao.nome}
                    </div>

                    <div class="medication-dose">
                        ${formatarNumero(
                            medicacao.dose
                        )}
                        ${medicacao.unidadeDose}
                    </div>

                    <div class="medication-info">

                        Vazão:
                        ${formatarNumero(
                            medicacao.vazao
                        )}
                        mL/h

                        <br>

                        Preparo:
                        ${formatarNumero(
                            medicacao.volumeMedicamento
                        )}
                        mL +

                        ${formatarNumero(
                            medicacao.volumeDiluente
                        )}
                        mL

                        <br>

                        Volume final:
                        ${formatarNumero(
                            medicacao.volumeFinal
                        )}
                        mL

                    </div>

                    <div class="medication-actions">

                        <button
                            type="button"
                            class="edit-medication"
                            data-index="${index}"
                        >
                            EDITAR
                        </button>

                        <button
                            type="button"
                            class="delete-medication"
                            data-index="${index}"
                        >
                            EXCLUIR
                        </button>

                    </div>

                `;


                listaMedicacoes.appendChild(item);

            }
        );
/* =====================================================
   MOSTRAR SINAIS VITAIS DO LEITO
   ===================================================== */

const sinais =
    leitos[leitoAtual].sinaisVitais;


/* Só mostra se houver sinais salvos */

if (sinais) {

    const sinaisDiv =
        document.createElement("div");

    sinaisDiv.className =
        "vital-signs-card";

    sinaisDiv.innerHTML = `

        <h3>
            ❤️ Sinais vitais
        </h3>

        <div class="vital-signs-info">

            FC: ${sinais.fc || "-"} bpm<br>

            FR: ${sinais.fr || "-"} irpm<br>

            PAS: ${sinais.pas || "-"} mmHg<br>

            PAD: ${sinais.pad || "-"} mmHg<br>

            PAM: ${sinais.pam || "-"} mmHg<br>

            SatO₂: ${sinais.sato2 || "-"} %

        </div>

    `;

    listaMedicacoes.appendChild(
        sinaisDiv
    );

}

    configurarBotoesMedicacao();

}


/* =====================================================
   BOTÕES DAS MEDICAÇÕES
   ===================================================== */

function configurarBotoesMedicacao() {


    document
        .querySelectorAll(
            ".delete-medication"
        )
        .forEach(
            function(botao) {

                botao.addEventListener(
                    "click",
                    function() {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (
                            confirm(
                                "Excluir esta medicação?"
                            )
                        ) {

                            leitos[
                                leitoAtual
                            ].medicacoes.splice(
                                index,
                                1
                            );


                            salvarDados();

                            mostrarMedicacoes();

                            atualizarBotoesLeitos();

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".edit-medication"
        )
        .forEach(
            function(botao) {

                botao.addEventListener(
                    "click",
                    function() {

                        const index =
                            Number(
                                this.dataset.index
                            );

                        editarMedicacao(index);

                    }
                );

            }
        );

}


/* =====================================================
   EDITAR MEDICAÇÃO
   ===================================================== */

function editarMedicacao(index) {

    if (
        !leitoAtual ||
        !leitos[leitoAtual]
    ) {
        return;
    }


    const medicacao =
        leitos[
            leitoAtual
        ].medicacoes[index];


    if (!medicacao) {
        return;
    }


    medicamentoSelect.value =
        medicacao.medicamentoKey;


    elemento("peso").value =
        medicacao.peso;


    volumeMedicamento.value =
        medicacao.volumeMedicamento;


    volumeDiluente.value =
        medicacao.volumeDiluente;


    elemento("vazao").value =
        medicacao.vazao;


    medicamentoSelect.dispatchEvent(
        new Event("change")
    );


    leitos[
        leitoAtual
    ].medicacoes.splice(
        index,
        1
    );


    salvarDados();


    if (tabCalculadora) {
        tabCalculadora.click();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   ADICIONAR AO LEITO
   ===================================================== */

if (adicionarAoLeito) {

    adicionarAoLeito.addEventListener(
        "click",
        function() {

            if (!ultimoResultado) {

                alert(
                    "Calcule uma dose antes de adicionar ao leito."
                );

                return;

            }


            if (!leitoSelecionado) {

                alert(
                    "Campo de leito não encontrado."
                );

                return;

            }


            const numeroLeito =
                obterNumero(
                    leitoSelecionado.value
                );


            if (
                !Number.isInteger(numeroLeito) ||
                numeroLeito < 1 ||
                numeroLeito > 10
            ) {

                alert(
                    "Informe um número de leito entre 1 e 10."
                );

                leitoSelecionado.focus();

                return;

            }


            const numero =
                String(numeroLeito);


            if (!leitos[numero]) {

                leitos[numero] = {

                    peso: "",

                    medicacoes: []

                };

            }


            leitos[numero].peso =
                ultimoResultado.peso;


            leitos[numero]
                .medicacoes
                .push(
                    ultimoResultado
                );


            salvarDados();


            atualizarBotoesLeitos();


            alert(
                `Medicação adicionada ao Leito ${numero}.`
            );

        }
    );

}


/* =====================================================
   SALVAR LEITO
   ===================================================== */

if (salvarLeito) {

    salvarLeito.addEventListener(
        "click",
        function() {

            if (!leitoAtual) {
                return;
            }


            leitos[leitoAtual].peso =
                pesoLeito.value;


            salvarDados();


            atualizarBotoesLeitos();


            alert(
                `Leito ${leitoAtual} salvo.`
            );

        }
    );

}


/* =====================================================
   RESETAR LEITO
   ===================================================== */

if (resetLeito) {

    resetLeito.addEventListener(
        "click",
        function() {

            if (!leitoAtual) {
                return;
            }


            const confirmar =
                confirm(
                    `Resetar todos os dados do Leito ${leitoAtual}?`
                );


            if (!confirmar) {
                return;
            }


            leitos[leitoAtual] = {

                peso: "",

                medicacoes: []

            };


            salvarDados();


            if (pesoLeito) {
                pesoLeito.value = "";
            }


            mostrarMedicacoes();

            atualizarBotoesLeitos();


            alert(
                `Leito ${leitoAtual} resetado.`
            );

        }
    );

}


/* =====================================================
   INDICADOR DOS LEITOS
   ===================================================== */

function atualizarBotoesLeitos() {

    botoesLeito.forEach(
        function(botao) {

            const numero =
                botao.dataset.leito;


            const possuiDados =
                leitos[numero] &&
                (
                    Boolean(
                        leitos[numero].peso
                    ) ||
                    (
                        Array.isArray(
                            leitos[numero].medicacoes
                        ) &&
                        leitos[numero]
                            .medicacoes
                            .length > 0
                    )
                );


            botao.classList.toggle(
                "has-data",
                possuiDados
            );

        }
    );

}

/* =====================================================
   SINAIS VITAIS
   ===================================================== */

const leitoSinaisVitais =
    elemento("leitoSinaisVitais");

const fc =
    elemento("fc");

const fr =
    elemento("fr");

const pas =
    elemento("pas");

const pad =
    elemento("pad");

const pam =
    elemento("pam");

const sato2 =
    elemento("sato2");

const salvarSinaisVitais =
    elemento("salvarSinaisVitais");


/* =====================================================
   SALVAR SINAIS VITAIS NO LEITO
   ===================================================== */

if (salvarSinaisVitais) {

    salvarSinaisVitais.addEventListener(
        "click",
        function() {

            const numeroLeito =
                obterNumero(
                    leitoSinaisVitais.value
                );


            /* =========================
               VALIDAR LEITO
            ========================= */

            if (
                !Number.isInteger(numeroLeito) ||
                numeroLeito < 1 ||
                numeroLeito > 10
            ) {

                alert(
                    "Informe um número de leito entre 1 e 10."
                );

                leitoSinaisVitais.focus();

                return;

            }


            const numero =
                String(numeroLeito);


            /* =========================
               CRIAR LEITO SE NECESSÁRIO
            ========================= */

            if (!leitos[numero]) {

                leitos[numero] = {

                    peso: "",

                    medicacoes: []

                };

            }


            /* =========================
               SALVAR SINAIS VITAIS
            ========================= */

            leitos[numero].sinaisVitais = {

                fc: fc.value,

                fr: fr.value,

                pas: pas.value,

                pad: pad.value,

                pam: pam.value,

                sato2: sato2.value

            };


            /* =========================
               SALVAR NO NAVEGADOR
            ========================= */

            salvarDados();


            /* =========================
               ATUALIZAR INDICADOR
            ========================= */

            atualizarBotoesLeitos();


            alert(
                `Sinais vitais salvos no Leito ${numero}.`
            );

        }
    );

}
/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

atualizarBotoesLeitos();


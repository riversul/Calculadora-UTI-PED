/* =====================================================
   CALCULADORA UTI PED — V1.3
   ===================================================== */


/* =========================
   MEDICAMENTOS
   ========================= */

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


/* =========================
   ELEMENTOS
   ========================= */

const medicamentoSelect =
    document.getElementById("medicamento");

const concentracaoBox =
    document.getElementById("concentracaoBox");

const concentracao =
    document.getElementById("concentracao");

const volumeMedicamento =
    document.getElementById("volumeMedicamento");

const volumeDiluente =
    document.getElementById("volumeDiluente");

const volumeFinal =
    document.getElementById("volumeFinal");

const calcular =
    document.getElementById("calcular");

const resultado =
    document.getElementById("resultado");

const erro =
    document.getElementById("erro");

const mensagemErro =
    document.getElementById("mensagemErro");

const resultadoMedicamento =
    document.getElementById("resultadoMedicamento");

const dose =
    document.getElementById("dose");

const unidadeDose =
    document.getElementById("unidadeDose");

const concentracaoFinal =
    document.getElementById("concentracaoFinal");

const resultadoVazao =
    document.getElementById("resultadoVazao");

const adicionarAoLeito =
    document.getElementById("adicionarAoLeito");


/* =========================
   ABAS
   ========================= */

const tabCalculadora =
    document.getElementById("tabCalculadora");

const tabLeitos =
    document.getElementById("tabLeitos");

const paginaCalculadora =
    document.getElementById("paginaCalculadora");

const paginaLeitos =
    document.getElementById("paginaLeitos");


tabCalculadora.addEventListener(
    "click",
    function() {

        tabCalculadora.classList.add("active");

        tabLeitos.classList.remove("active");

        paginaCalculadora.classList.remove("hidden");

        paginaLeitos.classList.add("hidden");

    }
);


tabLeitos.addEventListener(
    "click",
    function() {

        tabLeitos.classList.add("active");

        tabCalculadora.classList.remove("active");

        paginaLeitos.classList.remove("hidden");

        paginaCalculadora.classList.add("hidden");

        atualizarBotoesLeitos();

    }
);


/* =========================
   CONVERSÃO
   ========================= */

function obterNumero(valor) {

    if (
        valor === null ||
        valor === ""
    ) {
        return NaN;
    }

    return Number(
        String(valor)
            .replace(",", ".")
    );

}


/* =========================
   VOLUME FINAL
   ========================= */

function atualizarVolumeFinal() {

    const medicamento =
        obterNumero(
            volumeMedicamento.value
        );

    const diluente =
        obterNumero(
            volumeDiluente.value
        );


    if (
        Number.isFinite(medicamento) &&
        Number.isFinite(diluente)
    ) {

        const total =
            medicamento + diluente;


        volumeFinal.value =
            total
                .toFixed(2)
                .replace(".", ",");

    } else {

        volumeFinal.value = "";

    }

}


volumeMedicamento.addEventListener(
    "input",
    atualizarVolumeFinal
);

volumeDiluente.addEventListener(
    "input",
    atualizarVolumeFinal
);

volumeMedicamento.addEventListener(
    "change",
    atualizarVolumeFinal
);

volumeDiluente.addEventListener(
    "change",
    atualizarVolumeFinal
);


/* =========================
   MEDICAMENTO SELECIONADO
   ========================= */

medicamentoSelect.addEventListener(
    "change",
    function() {

        const medicamento =
            medicamentos[this.value];


        resultado.classList.add("hidden");

        erro.classList.add("hidden");


        if (!medicamento) {

            concentracaoBox.classList.add(
                "hidden"
            );

            return;

        }


        concentracao.textContent =
            medicamento.apresentacao;


        concentracaoBox.classList.remove(
            "hidden"
        );

    }
);


/* =========================
   FORMATAÇÃO
   ========================= */

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


/* =========================
   ERRO
   ========================= */

function mostrarErro(texto) {

    mensagemErro.textContent =
        texto;

    erro.classList.remove(
        "hidden"
    );

    resultado.classList.add(
        "hidden"
    );

}


/* =========================
   ÚLTIMO RESULTADO
   ========================= */

let ultimoResultado = null;


/* =========================
   CALCULAR DOSE
   ========================= */

calcular.addEventListener(
    "click",
    function() {

        erro.classList.add(
            "hidden"
        );

        resultado.classList.add(
            "hidden"
        );


        const medicamentoSelecionado =
            medicamentoSelect.value;


        const peso =
            obterNumero(
                document.getElementById(
                    "peso"
                ).value
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
                document.getElementById(
                    "vazao"
                ).value
            );


        /* VALIDAÇÕES */

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
            !Number.isFinite(
                volumeDiluenteValue
            ) ||
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


        /* VOLUME FINAL */

        const volumeTotal =
            volumeDroga +
            volumeDiluenteValue;


        /* QUANTIDADE TOTAL */

        const quantidadeTotalMcg =
            medicamento.concentracaoMcgMl *
            volumeDroga;


        /* CONCENTRAÇÃO FINAL */

        const concentracaoMcgMl =
            quantidadeTotalMcg /
            volumeTotal;


        /* QUANTIDADE POR HORA */

        const quantidadePorHoraMcg =
            concentracaoMcgMl *
            vazao;


        let doseCalculada;


        /* µg/kg/min */

        if (
            medicamento.tipoDose ===
            "mcgkgmin"
        ) {

            doseCalculada =
                quantidadePorHoraMcg /
                peso /
                60;

        }


        /* µg/kg/h */

        else if (
            medicamento.tipoDose ===
            "mcgkgh"
        ) {

            doseCalculada =
                quantidadePorHoraMcg /
                peso;

        }


        /* mg/kg/h */

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


        /* GUARDAR RESULTADO */

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

            diluente:
                document.getElementById(
                    "diluente"
                ).value,

            peso:
                peso

        };


        /* MOSTRAR RESULTADO */

        resultadoMedicamento.textContent =
            medicamento.nome;


        dose.textContent =
            formatarNumero(
                doseCalculada
            );


        unidadeDose.textContent =
            medicamento.unidadeDose;


        concentracaoFinal.textContent =
            `${formatarNumero(volumeTotal)} mL`;


        resultadoVazao.textContent =
            `${formatarNumero(vazao)} mL/h`;


        resultado.classList.remove(
            "hidden"
        );


        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* =====================================================
   SISTEMA DE LEITOS
   ===================================================== */


/*
   Estrutura:

   leitos = {
       "01": {
           peso: 10,
           medicacoes: [...]
       }
   }
*/


let leitos = JSON.parse(
    localStorage.getItem(
        "calculadoraUTIPED_leitos"
    )
) || {};


let leitoAtual = null;


const painelLeito =
    document.getElementById(
        "painelLeito"
    );


const leitoAtualElemento =
    document.getElementById(
        "leitoAtual"
    );


const pesoLeito =
    document.getElementById(
        "pesoLeito"
    );


const listaMedicacoes =
    document.getElementById(
        "listaMedicacoes"
    );


const botoesLeito =
    document.querySelectorAll(
        ".leito-button"
    );


const salvarLeito =
    document.getElementById(
        "salvarLeito"
    );


const resetLeito =
    document.getElementById(
        "resetLeito"
    );


/* =========================
   SALVAR NO NAVEGADOR
   ========================= */

function salvarDados() {

    localStorage.setItem(
        "calculadoraUTIPED_leitos",
        JSON.stringify(leitos)
    );

}


/* =========================
   SELECIONAR LEITO
   ========================= */

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

    leitoAtual = numero;


    if (!leitos[numero]) {

        leitos[numero] = {

            peso: "",

            medicacoes: []

        };

    }


    leitoAtualElemento.textContent =
        numero;


    pesoLeito.value =
        leitos[numero].peso || "";


    painelLeito.classList.remove(
        "hidden"
    );


    botoesLeito.forEach(
        function(botao) {

            botao.classList.toggle(
                "active",
                botao.dataset.leito === numero
            );

        }
    );


    mostrarMedicacoes();

}


/* =========================
   MOSTRAR MEDICAÇÕES
   ========================= */

function mostrarMedicacoes() {

    listaMedicacoes.innerHTML = "";


    if (
        !leitoAtual ||
        !leitos[leitoAtual] ||
        leitos[leitoAtual]
            .medicacoes.length === 0
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
                    document.createElement(
                        "div"
                    );


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

                        <br>

                        ${medicacao.diluente}

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


                listaMedicacoes.appendChild(
                    item
                );

            }
        );


    configurarBotoesMedicacao();

}


/* =========================
   BOTÕES MEDICAÇÃO
   ========================= */

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
                            ].medicacoes
                                .splice(
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


                        editarMedicacao(
                            index
                        );

                    }
                );

            }
        );

}


/* =========================
   EDITAR MEDICAÇÃO
   ========================= */

function editarMedicacao(index) {

    const medicacao =
        leitos[
            leitoAtual
        ].medicacoes[index];


    medicamentoSelect.value =
        medicacao.medicamentoKey;


    document.getElementById(
        "peso"
    ).value =
        medicacao.peso;


    volumeMedicamento.value =
        medicacao.volumeMedicamento;


    volumeDiluente.value =
        medicacao.volumeDiluente;


    document.getElementById(
        "vazao"
    ).value =
        medicacao.vazao;


    document.getElementById(
        "diluente"
    ).value =
        medicacao.diluente;


    atualizarVolumeFinal();


    medicamentoSelect.dispatchEvent(
        new Event("change")
    );


    /* remover antigo */

    leitos[
        leitoAtual
    ].medicacoes.splice(
        index,
        1
    );


    salvarDados();


    /* voltar calculadora */

    tabCalculadora.click();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   ADICIONAR AO LEITO
   ========================= */

adicionarAoLeito.addEventListener(
    "click",
    function() {

        if (!ultimoResultado) {

            alert(
                "Calcule uma dose antes de adicionar ao leito."
            );

            return;

        }


        if (!leitoAtual) {

            alert(
                "Selecione um leito na aba Leitos antes de adicionar a medicação."
            );

            return;

        }


        leitos[leitoAtual]
            .peso =
            ultimoResultado.peso;


        leitos[leitoAtual]
            .medicacoes
            .push(
                ultimoResultado
            );


        salvarDados();


        atualizarBotoesLeitos();


        alert(
            `Medicação adicionada ao Leito ${leitoAtual}.`
        );

    }
);


/* =========================
   SALVAR LEITO
   ========================= */

salvarLeito.addEventListener(
    "click",
    function() {

        if (!leitoAtual) {

            return;

        }


        leitos[leitoAtual].peso =
            pesoLeito.value;


        salvarDados();


        alert(
            `Leito ${leitoAtual} salvo.`
        );


        atualizarBotoesLeitos();

    }
);


/* =========================
   RESET LEITO
   ========================= */

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


        pesoLeito.value = "";

        mostrarMedicacoes();

        atualizarBotoesLeitos();


        alert(
            `Leito ${leitoAtual} resetado.`
        );

    }
);


/* =========================
   INDICADOR DOS LEITOS
   ========================= */

function atualizarBotoesLeitos() {

    botoesLeito.forEach(
        function(botao) {

            const numero =
                botao.dataset.leito;


            const possuiDados =
                leitos[numero] &&
                (
                    leitos[numero].peso ||
                    leitos[numero]
                        .medicacoes
                        .length > 0
                );


            botao.classList.toggle(
                "has-data",
                Boolean(possuiDados)
            );

        }
    );

}


/* =========================
   INICIALIZAÇÃO
   ========================= */

atualizarVolumeFinal();

atualizarBotoesLeitos();

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
   ELEMENTOS
   ===================================================== */

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

const leitoSelecionado =
    document.getElementById("leitoSelecionado");


/* =====================================================
   ABAS
   ===================================================== */

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


/* =====================================================
   CONVERSÃO DE NÚMEROS
   ===================================================== */

function obterNumero(valor) {

    if (
        valor === null ||
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

    mensagemErro.textContent = texto;

    erro.classList.remove("hidden");

    resultado.classList.add("hidden");

}


/* =====================================================
   MEDICAMENTO SELECIONADO
   ===================================================== */

medicamentoSelect.addEventListener(
    "change",
    function() {

        const medicamento =
            medicamentos[this.value];

        resultado.classList.add("hidden");

        erro.classList.add("hidden");


        if (!medicamento) {

            concentracaoBox.classList.add("hidden");

            return;

        }


        concentracao.textContent =
            medicamento.apresentacao;

        concentracaoBox.classList.remove("hidden");

    }
);


/* =====================================================
   ÚLTIMO RESULTADO
   ===================================================== */

let ultimoResultado = null;


/* =====================================================
   CALCULAR DOSE
   ===================================================== */

calcular.addEventListener(
    "click",
    function() {

        erro.classList.add("hidden");

        resultado.classList.add("hidden");


        const medicamentoSelecionado =
            medicamentoSelect.value;


        const peso =
            obterNumero(
                document.getElementById("peso").value
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
                document.getElementById("vazao").value
            );


        /* =================================================
           VALIDAÇÕES
        ================================================= */

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
            medicamentos[medicamentoSelecionado];


        /* =================================================
           VOLUME FINAL
           
           O campo não aparece mais na tela,
           mas continua sendo calculado.
        ================================================= */

        const volumeTotal =
            volumeDroga +
            volumeDiluenteValue;


        if (volumeTotal <= 0) {

            mostrarErro(
                "O volume final deve ser maior que zero."
            );

            return;

        }


        /* =================================================
           QUANTIDADE TOTAL
        ================================================= */

        const quantidadeTotalMcg =
            medicamento.concentracaoMcgMl *
            volumeDroga;


        /* =================================================
           CONCENTRAÇÃO FINAL
        ================================================= */

        const concentracaoMcgMl =
            quantidadeTotalMcg /
            volumeTotal;


        /* =================================================
           QUANTIDADE POR HORA
        ================================================= */

        const quantidadePorHoraMcg =
            concentracaoMcgMl *
            vazao;


        let doseCalculada;


        /* =================================================
           µg/kg/min
        ================================================= */

        if (
            medicamento.tipoDose === "mcgkgmin"
        ) {

            doseCalculada =
                quantidadePorHoraMcg /
                peso /
                60;

        }


        /* =================================================
           µg/kg/h
        ================================================= */

        else if (
            medicamento.tipoDose === "mcgkgh"
        ) {

            doseCalculada =
                quantidadePorHoraMcg /
                peso;

        }


        /* =================================================
           mg/kg/h
        ================================================= */

        else if (
            medicamento.tipoDose === "mgkgh"
        ) {

            const quantidadePorHoraMg =
                quantidadePorHoraMcg /
                1000;

            doseCalculada =
                quantidadePorHoraMg /
                peso;

        }


        /* =================================================
           GUARDAR RESULTADO
        ================================================= */

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


        /* =================================================
           MOSTRAR RESULTADO
        ================================================= */

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


        resultado.classList.remove("hidden");


        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* =====================================================
   SISTEMA DE LEITOS
   ===================================================== */

let leitos = JSON.parse(
    localStorage.getItem(
        "calculadoraUTIPED_leitos"
    )
) || {};


const painelLeito =
    document.getElementById("painelLeito");

const leitoAtualElemento =
    document.getElementById("leitoAtual");

const pesoLeito =
    document.getElementById("pesoLeito");

const listaMedicacoes =
    document.getElementById("listaMedicacoes");

const botoesLeito =
    document.querySelectorAll(".leito-button");

const salvarLeito =
    document.getElementById("salvarLeito");

const resetLeito =
    document.getElementById("resetLeito");


let leitoAtual = null;


/* =====================================================
   SALVAR DADOS
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

    leitoAtual = String(numero);


    if (!leitos[leitoAtual]) {

        leitos[leitoAtual] = {

            peso: "",

            medicacoes: []

        };

        salvarDados();

    }


    leitoAtualElemento.textContent =
        leitoAtual;


    pesoLeito.value =
        leitos[leitoAtual].peso || "";


    painelLeito.classList.remove(
        "hidden"
    );


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


    configurarBotoesMedicacao();

}


/* =====================================================
   BOTÕES DAS MEDICAÇÕES
   ===================================================== */

function configurarBotoesMedicacao() {


    document
        .querySelectorAll(".delete-medication")
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
        .querySelectorAll(".edit-medication")
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

    const medicacao =
        leitos[
            leitoAtual
        ].medicacoes[index];


    if (!medicacao) {
        return;
    }


    medicamentoSelect.value =
        medicacao.medicamentoKey;


    document.getElementById("peso").value =
        medicacao.peso;


    volumeMedicamento.value =
        medicacao.volumeMedicamento;


    volumeDiluente.value =
        medicacao.volumeDiluente;


    document.getElementById("vazao").value =
        medicacao.vazao;


    medicamentoSelect.dispatchEvent(
        new Event("change")
    );


    /*
       Remover a versão antiga.
       Ao clicar em CALCULAR e depois
       ADICIONAR AO LEITO, será criada
       a nova versão.
    */

    leitos[
        leitoAtual
    ].medicacoes.splice(
        index,
        1
    );


    salvarDados();


    tabCalculadora.click();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   ADICIONAR AO LEITO
   ===================================================== */

adicionarAoLeito.addEventListener(
    "click",
    function() {

        if (!ultimoResultado) {

            alert(
                "Calcule uma dose antes de adicionar ao leito."
            );

            return;

        }


        /*
           Agora o leito vem diretamente
           da caixa da página inicial.
        */

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


        /*
           Criar leito caso ainda não exista.
        */

        if (!leitos[numero]) {

            leitos[numero] = {

                peso: "",

                medicacoes: []

            };

        }


        /*
           Salvar o peso.
        */

        leitos[numero].peso =
            ultimoResultado.peso;


        /*
           Adicionar medicação.
        */

        leitos[numero]
            .medicacoes
            .push(
                ultimoResultado
            );


        /*
           Salvar no navegador.
        */

        salvarDados();


        atualizarBotoesLeitos();


        alert(
            `Medicação adicionada ao Leito ${numero}.`
        );

    }
);


/* =====================================================
   SALVAR LEITO
   ===================================================== */

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


/* =====================================================
   RESETAR LEITO
   ===================================================== */

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
   INICIALIZAÇÃO
   ===================================================== */

atualizarBotoesLeitos();

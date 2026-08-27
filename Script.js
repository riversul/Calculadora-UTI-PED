/*
    CALCULADORA UTI PED
    Versão 1.0
    ATENÇÃO:
    As concentrações abaixo são as cadastradas para esta versão.
    O usuário não altera a concentração diretamente na tela.
*/
const medicamentos = {
    noradrenalina: {
        nome: "Noradrenalina",
        concentracao: 1,
        unidadeConcentracao: "mg/mL",
        concentracaoMcgMl: 1000,
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },
    adrenalina: {
        nome: "Adrenalina",
        concentracao: 1,
        unidadeConcentracao: "mg/mL",
        concentracaoMcgMl: 1000,
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },
    dopamina: {
        nome: "Dopamina",
        concentracao: 5,
        unidadeConcentracao: "mg/mL",
        concentracaoMcgMl: 5000,
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },
    dobutamina: {
        nome: "Dobutamina",
        concentracao: 12.5,
        unidadeConcentracao: "mg/mL",
        concentracaoMcgMl: 12500,
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },
    fentanil: {
        nome: "Fentanil",
        concentracao: 50,
        unidadeConcentracao: "µg/mL",
        concentracaoMcgMl: 50,
        unidadeDose: "µg/kg/h",
        tipoDose: "mcgkgh"
    },
    midazolam: {
        nome: "Midazolam",
        concentracao: 5,
        unidadeConcentracao: "mg/mL",
        concentracaoMcgMl: 5000,
        unidadeDose: "mg/kg/h",
        tipoDose: "mgkgh"
    },
    dexmedetomidina: {
        nome: "Dexmedetomidina",
        concentracao: 100,
        unidadeConcentracao: "µg/mL",
        concentracaoMcgMl: 100,
        unidadeDose: "µg/kg/h",
        tipoDose: "mcgkgh"
    },
    milrinona: {
        nome: "Milrinona",
        concentracao: 1,
        unidadeConcentracao: "mg/mL",
        concentracaoMcgMl: 1000,
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    },
    rocuronio: {
        nome: "Rocurônio",
        concentracao: 10,
        unidadeConcentracao: "µg/mL",
        concentracaoMcgMl: 10,
        unidadeDose: "µg/kg/min",
        tipoDose: "mcgkgmin"
    }
};
/* ELEMENTOS DA PÁGINA */
const medicamentoSelect =
    document.getElementById("medicamento");
const concentracaoBox =
    document.getElementById("concentracaoBox");
const concentracao =
    document.getElementById("concentracao");
const calcularButton =
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
/* CONVERTE VÍRGULA EM PONTO */
function numero(valor) {
    if (typeof valor !== "string") {
        return Number(valor);
    }
    return Number(
        valor.replace(",", ".")
    );
}
/* MOSTRAR CONCENTRAÇÃO DO MEDICAMENTO */
medicamentoSelect.addEventListener("change", function() {
    const medicamento =
        medicamentos[this.value];
    resultado.classList.add("hidden");
    erro.classList.add("hidden");
    if (!medicamento) {
        concentracaoBox.classList.add("hidden");
        return;
    }
    concentracao.textContent =
        `${medicamento.concentracao} ${medicamento.unidadeConcentracao}`;
    concentracaoBox.classList.remove("hidden");
});
/* FORMATA NÚMEROS */
function formatarNumero(valor) {
    if (!Number.isFinite(valor)) {
        return "-";
    }
    let casas = 2;
    if (valor >= 10) {
        casas = 1;
    }
    if (valor >= 100) {
        casas = 0;
    }
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: casas
    });
}
/* MOSTRAR ERRO */
function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    erro.classList.remove("hidden");
    resultado.classList.add("hidden");
    window.scrollTo({
        top: erro.offsetTop - 20,
        behavior: "smooth"
    });
}
/* CALCULAR */
calcularButton.addEventListener("click", function() {
    erro.classList.add("hidden");
    resultado.classList.add("hidden");
    const medicamentoSelecionado =
        medicamentoSelect.value;
    const peso =
        numero(document.getElementById("peso").value);
    const volumeMedicamento =
        numero(document.getElementById("volumeMedicamento").value);
    const volumeFinal =
        numero(document.getElementById("volumeFinal").value);
    const vazao =
        numero(document.getElementById("vazao").value);
    /* VALIDAÇÕES */
    if (!medicamentoSelecionado) {
        mostrarErro(
            "Selecione o medicamento."
        );
        return;
    }
    if (!Number.isFinite(peso) || peso <= 0) {
        mostrarErro(
            "Informe um peso válido."
        );
        return;
    }
    if (
        !Number.isFinite(volumeMedicamento) ||
        volumeMedicamento <= 0
    ) {
        mostrarErro(
            "Informe o volume do medicamento."
        );
        return;
    }
    if (
        !Number.isFinite(volumeFinal) ||
        volumeFinal <= 0
    ) {
        mostrarErro(
            "Informe o volume final da solução."
        );
        return;
    }
    if (volumeFinal < volumeMedicamento) {
        mostrarErro(
            "O volume final não pode ser menor que o volume do medicamento."
        );
        return;
    }
    if (!Number.isFinite(vazao) || vazao <= 0) {
        mostrarErro(
            "Informe uma vazão válida."
        );
        return;
    }
    const medicamento =
        medicamentos[medicamentoSelecionado];
    /*
        CÁLCULO DA CONCENTRAÇÃO FINAL
        concentração do estoque:
        mcg/mL
        quantidade total adicionada:
        mcg/mL × volume do medicamento
        concentração final:
        quantidade total / volume final
    */
    const quantidadeTotalMcg =
        medicamento.concentracaoMcgMl *
        volumeMedicamento;
    const concentracaoFinalMcgMl =
        quantidadeTotalMcg /
        volumeFinal;
    /*
        QUANTIDADE ADMINISTRADA POR HORA
        mcg/mL × mL/h = mcg/h
    */
    const quantidadePorHoraMcg =
        concentracaoFinalMcgMl *
        vazao;
    let doseCalculada;
    /*
        MEDICAMENTOS EM µg/kg/min
    */
    if (medicamento.tipoDose === "mcgkgmin") {
        doseCalculada =
            quantidadePorHoraMcg /
            peso /
            60;
    }
    /*
        MEDICAMENTOS EM µg/kg/h
    */
    else if (medicamento.tipoDose === "mcgkgh") {
        doseCalculada =
            quantidadePorHoraMcg /
            peso;
    }
    /*
        MIDAZOLAM
        Converter µg para mg
    */
    else if (medicamento.tipoDose === "mgkgh") {
        const quantidadePorHoraMg =
            quantidadePorHoraMcg / 1000;
        doseCalculada =
            quantidadePorHoraMg /
            peso;
    }
    /* EXIBIR RESULTADO */
    resultadoMedicamento.textContent =
        medicamento.nome;
    dose.textContent =
        formatarNumero(doseCalculada);
    unidadeDose.textContent =
        medicamento.unidadeDose;
    concentracaoFinal.textContent =
        `${formatarNumero(concentracaoFinalMcgMl)} µg/mL`;
    resultadoVazao.textContent =
        `${formatarNumero(vazao)} mL/h`;
    resultado.classList.remove("hidden");
    /* ROLAR ATÉ O RESULTADO */
    setTimeout(function() {
        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 100);
});

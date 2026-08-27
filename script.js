/*
    CALCULADORA UTI PED
    Versão 1.1
    O volume final é calculado automaticamente:
    VOLUME FINAL =
    VOLUME DO MEDICAMENTO + VOLUME DO DILUENTE
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
        unidadeDose: "mcgkgmin"
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
/* ELEMENTOS */
const medicamentoSelect =
    document.getElementById("medicamento");
const concentracaoBox =
    document.getElementById("concentracaoBox");
const concentracao =
    document.getElementById("concentracao");
const volumeMedicamentoInput =
    document.getElementById("volumeMedicamento");
const volumeDiluenteInput =
    document.getElementById("volumeDiluente");
const volumeFinalInput =
    document.getElementById("volumeFinal");
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
/* CONVERTER VÍRGULA EM PONTO */
function numero(valor) {
    if (typeof valor !== "string") {
        return Number(valor);
    }
    return Number(
        valor.replace(",", ".")
    );
}
/* CALCULAR VOLUME FINAL AUTOMATICAMENTE */
function atualizarVolumeFinal() {
    const volumeMedicamento =
        numero(volumeMedicamentoInput.value);
    const volumeDiluente =
        numero(volumeDiluenteInput.value);
    if (
        Number.isFinite(volumeMedicamento) &&
        volumeMedicamento >= 0 &&
        Number.isFinite(volumeDiluente) &&
        volumeDiluente >= 0
    ) {
        const volumeFinal =
            volumeMedicamento + volumeDiluente;
        volumeFinalInput.value =
            volumeFinal.toString();
    } else {
        volumeFinalInput.value = "";
    }
}
/* ATUALIZAR VOLUME FINAL AO DIGITAR */
volumeMedicamentoInput.addEventListener(
    "input",
    atualizarVolumeFinal
);
volumeDiluenteInput.addEventListener(
    "input",
    atualizarVolumeFinal
);
/* MOSTRAR CONCENTRAÇÃO */
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
            `${medicamento.concentracao} ${medicamento.unidadeConcentracao}`;
        concentracaoBox.classList.remove("hidden");
    }
);
/* FORMATAR NÚMEROS */
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
/* MOSTRAR ERRO */
function mostrarErro(mensagem) {
    mensagemErro.textContent =
        mensagem;
    erro.classList.remove("hidden");
    resultado.classList.add("hidden");
}
/* CALCULAR */
calcularButton.addEventListener(
    "click",
    function() {
        erro.classList.add("hidden");
        resultado.classList.add("hidden");
        const medicamentoSelecionado =
            medicamentoSelect.value;
        const peso =
            numero(
                document.getElementById("peso").value
            );
        const volumeMedicamento =
            numero(
                volumeMedicamentoInput.value
            );
        const volumeDiluente =
            numero(
                volumeDiluenteInput.value
            );
        const vazao =
            numero(
                document.getElementById("vazao").value
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
            !Number.isFinite(volumeMedicamento) ||
            volumeMedicamento <= 0
        ) {
            mostrarErro(
                "Informe o volume do medicamento."
            );
            return;
        }
        if (
            !Number.isFinite(volumeDiluente) ||
            volumeDiluente < 0
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
        /* MEDICAMENTO */
        const medicamento =
            medicamentos[medicamentoSelecionado];
        /* VOLUME FINAL */
        const volumeFinal =
            volumeMedicamento +
            volumeDiluente;
        if (volumeFinal <= 0) {
            mostrarErro(
                "O volume final deve ser maior que zero."
            );
            return;
        }
        /*
            QUANTIDADE TOTAL DO MEDICAMENTO
            concentração do frasco ×
            volume utilizado
        */
        const quantidadeTotalMcg =
            medicamento.concentracaoMcgMl *
            volumeMedicamento;
        /*
            CONCENTRAÇÃO FINAL
            µg ÷ mL
        */
        const concentracaoFinalMcgMl =
            quantidadeTotalMcg /
            volumeFinal;
        /*
            QUANTIDADE ADMINISTRADA POR HORA
            µg/mL × mL/h
            = µg/h
        */
        const quantidadePorHoraMcg =
            concentracaoFinalMcgMl *
            vazao;
        let doseCalculada;
        /*
            µg/kg/min
        */
        if (
            medicamento.tipoDose ===
            "mcgkgmin"
        ) {
            doseCalculada =
                quantidadePorHoraMcg /
                peso /
                60;
        }
        /*
            µg/kg/h
        */
        else if (
            medicamento.tipoDose ===
            "mcgkgh"
        ) {
            doseCalculada =
                quantidadePorHoraMcg /
                peso;
        }
        /*
            mg/kg/h
        */
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
        /* RESULTADO */
        resultadoMedicamento.textContent =
            medicamento.nome;
        dose.textContent =
            formatarNumero(doseCalculada);
        unidadeDose.textContent =
            medicamento.unidadeDose;
        concentracaoFinal.textContent =
            `${formatarNumero(volumeFinal)} mL`;
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

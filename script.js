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
/* ELEMENTOS */
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
/* RESULTADO */
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
/* CONVERTER NÚMERO */
function obterNumero(valor) {
    if (valor === null || valor === "") {
        return NaN;
    }
    return Number(
        String(valor).replace(",", ".")
    );
}
/* VOLUME FINAL AUTOMÁTICO */
function atualizarVolumeFinal() {
    const medicamento =
        obterNumero(volumeMedicamento.value);
    const diluente =
        obterNumero(volumeDiluente.value);
    if (
        Number.isFinite(medicamento) &&
        Number.isFinite(diluente)
    ) {
        const total =
            medicamento + diluente;
        volumeFinal.value =
            total.toFixed(2).replace(".", ",");
    } else {
        volumeFinal.value = "";
    }
}
/*
    ATUALIZA ENQUANTO O USUÁRIO DIGITA
*/
volumeMedicamento.addEventListener(
    "input",
    atualizarVolumeFinal
);
volumeDiluente.addEventListener(
    "input",
    atualizarVolumeFinal
);
/*
    TAMBÉM ATUALIZA AO SAIR DO CAMPO
*/
volumeMedicamento.addEventListener(
    "change",
    atualizarVolumeFinal
);
volumeDiluente.addEventListener(
    "change",
    atualizarVolumeFinal
);
/* SELEÇÃO DO MEDICAMENTO */
medicamentoSelect.addEventListener(
    "change",
    function() {
        const medicamento =
            medicamentos[this.value];
        resultado.classList.add(
            "hidden"
        );
        erro.classList.add(
            "hidden"
        );
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
/* FORMATAÇÃO */
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
/* ERRO */
function mostrarErro(texto) {
    mensagemErro.textContent = texto;
    erro.classList.remove(
        "hidden"
    );
    resultado.classList.add(
        "hidden"
    );
}
/* CALCULAR DOSE */
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
/*
    GARANTE O VOLUME FINAL
    AO CARREGAR A PÁGINA
*/
atualizarVolumeFinal();
